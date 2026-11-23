import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { decode, validate, type Workout } from './workouts';
const KEY = 'workout-ledger:v1';
type Store = { workouts: Workout[]; ready: boolean; error: string | null; retry: () => Promise<void>; save: (workout: Workout) => Promise<void> };
const Context = createContext<Store | null>(null);
export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const busy = useRef(false);
  async function retry() {
    setReady(false); setError(null);
    try { setWorkouts(decode(await AsyncStorage.getItem(KEY))); setReady(true); }
    catch { setError('Your saved workouts could not be loaded. Nothing has been overwritten. Try again; if this continues, keep the app data and ask for help.'); }
  }
  useEffect(() => { void retry(); }, []);
  async function save(workout: Workout) {
    if (!ready || busy.current) throw new Error('Please wait until your workouts finish loading or saving.');
    const issue = validate(workout); if (issue) throw new Error(issue);
    busy.current = true;
    try {
      const next = [workout, ...workouts.filter(w => w.id !== workout.id)].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      await AsyncStorage.setItem(KEY, JSON.stringify({ version: 1, workouts: next }));
      setWorkouts(next);
    } catch { throw new Error('Could not save this workout. Your draft is still here. Please try again.'); }
    finally { busy.current = false; }
  }
  return <Context.Provider value={{ workouts, ready, error, retry, save }}>{children}</Context.Provider>;
}
export function useWorkouts() { const value = useContext(Context); if (!value) throw new Error('WorkoutProvider missing'); return value; }
