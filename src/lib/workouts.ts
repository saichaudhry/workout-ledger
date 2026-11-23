export type Exercise = { name: string; sets: number; reps: number; weight: number };
export type Workout = { id: string; createdAt: string; title: string; exercises: Exercise[]; effort: number | null; notes: string };
export const normalize = (name: string) => name.trim().replace(/\s+/g, ' ').toLowerCase();
export const volume = (exercise: Exercise) => exercise.sets * exercise.reps * exercise.weight;
export const totalVolume = (exercises: Exercise[]) => exercises.reduce((sum, e) => sum + volume(e), 0);
export const number = (value: number) => value.toLocaleString('en-US', { maximumFractionDigits: 1 });
export function validate(workout: Workout): string | null {
  if (!workout.title.trim() || workout.title.length > 80) return 'Give your workout a title (up to 80 characters).';
  if (!workout.exercises.length || workout.exercises.length > 30) return 'Add between 1 and 30 exercises.';
  const names = new Set<string>();
  for (const e of workout.exercises) {
    if (!e.name.trim() || e.name.length > 80) return 'Every exercise needs a name (up to 80 characters).';
    if (names.has(normalize(e.name))) return 'Use each exercise name once per workout.';
    names.add(normalize(e.name));
    if (!Number.isInteger(e.sets) || e.sets < 1 || e.sets > 100) return 'Sets must be a whole number from 1 to 100.';
    if (!Number.isInteger(e.reps) || e.reps < 1 || e.reps > 1000) return 'Reps must be a whole number from 1 to 1,000.';
    if (!Number.isFinite(e.weight) || e.weight < 0 || e.weight > 10000) return 'Weight must be a number from 0 to 10,000 lb.';
  }
  if (workout.effort !== null && (!Number.isInteger(workout.effort) || workout.effort < 1 || workout.effort > 10)) return 'Effort must be a whole number from 1 to 10, or left blank.';
  if (workout.notes.length > 1000) return 'Keep notes under 1,000 characters.';
  return null;
}
export function comparison(workout: Workout, exercise: Exercise, workouts: Workout[]): number | null {
  const previous = workouts.filter(w => w.id !== workout.id && w.createdAt < workout.createdAt)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .find(w => w.exercises.some(e => normalize(e.name) === normalize(exercise.name)));
  const baseline = previous?.exercises.find(e => normalize(e.name) === normalize(exercise.name));
  if (!baseline || volume(baseline) === 0) return null;
  return (volume(exercise) - volume(baseline)) / volume(baseline) * 100;
}
export function decode(raw: string | null): Workout[] {
  if (raw === null) return [];
  const data: unknown = JSON.parse(raw);
  if (!data || typeof data !== 'object' || !('version' in data) || data.version !== 1 || !('workouts' in data) || !Array.isArray(data.workouts)) throw new Error('Unsupported saved data');
  const ids = new Set<string>();
  for (const w of data.workouts) {
    if (!w || typeof w.id !== 'string' || !w.id || ids.has(w.id) || typeof w.createdAt !== 'string' || !Number.isFinite(Date.parse(w.createdAt)) || new Date(w.createdAt).toISOString() !== w.createdAt || typeof w.title !== 'string' || typeof w.notes !== 'string' || !Array.isArray(w.exercises) || !w.exercises.every((e: Exercise) => e && typeof e.name === 'string') || validate(w)) throw new Error('Invalid saved workout');
    ids.add(w.id);
  }
  return data.workouts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
