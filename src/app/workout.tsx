import { router, Stack, useLocalSearchParams } from "expo-router";
import { useRef, useState, type ComponentRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "expo-router/react-navigation";
import { Button, Field, colors, s } from "../components/ui";
import { useWorkouts } from "../lib/store";
import { number, totalVolume, validate, type Workout } from "../lib/workouts";
type DraftExercise = {
  key: string;
  name: string;
  sets: string;
  reps: string;
  weight: string;
};
const blank = (): DraftExercise => ({
  key: `${Date.now()}-${Math.random()}`,
  name: "",
  sets: "3",
  reps: "10",
  weight: "",
});
const numeric = (value: string) =>
  value.trim() && /^\d+(\.\d+)?$/.test(value.trim()) ? Number(value) : NaN;
export default function WorkoutScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { workouts, ready } = useWorkouts();
  if (!ready)
    return (
      <View style={[s.page, { padding: 24 }]}>
        <Text style={s.subtitle}>
          Return to History and wait for your workouts to load.
        </Text>
      </View>
    );
  const existing = workouts.find((w) => w.id === id);
  if (id && !existing)
    return (
      <View style={[s.page, { padding: 24 }]}>
        <Text style={s.error}>This workout could not be found.</Text>
        <Button title="Back to history" onPress={() => router.replace("/")} />
      </View>
    );
  return <Editor key={id ?? "new"} existing={existing} />;
}
function Editor({ existing }: { existing?: Workout }) {
  const { save } = useWorkouts();
  const headerHeight = useHeaderHeight();
  const [identity] = useState(() => ({
    id: existing?.id ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    createdAt: existing?.createdAt ?? new Date().toISOString(),
  }));
  const [title, setTitle] = useState(existing?.title ?? "");
  const [exercises, setExercises] = useState<DraftExercise[]>(
    () =>
      existing?.exercises.map((e, i) => ({
        key: String(i),
        name: e.name,
        sets: String(e.sets),
        reps: String(e.reps),
        weight: String(e.weight),
      })) ?? [blank()],
  );
  const [effort, setEffort] = useState(existing?.effort?.toString() ?? "");
  const [notes, setNotes] = useState(existing?.notes ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const lock = useRef(false);
  const scroll = useRef<ComponentRef<typeof ScrollView>>(null);
  const parsed = exercises.map((e) => ({
    name: e.name.trim().replace(/\s+/g, " "),
    sets: numeric(e.sets),
    reps: numeric(e.reps),
    weight: numeric(e.weight),
  }));
  const total = totalVolume(parsed);
  function update(key: string, field: keyof DraftExercise, value: string) {
    setExercises((prev) =>
      prev.map((e) => (e.key === key ? { ...e, [field]: value } : e)),
    );
  }
  async function submit() {
    if (lock.current) return;
    const workout: Workout = {
      ...identity,
      title: title.trim(),
      exercises: parsed,
      effort: effort.trim() ? numeric(effort) : null,
      notes: notes.trim(),
    };
    const issue = validate(workout);
    if (issue) {
      setError(issue);
      scroll.current?.scrollTo({ y: 0, animated: true });
      return;
    }
    lock.current = true;
    setSaving(true);
    setError("");
    try {
      await save(workout);
      if (router.canGoBack()) router.back();
      else router.replace("/");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Could not save. Please try again.",
      );
      scroll.current?.scrollTo({ y: 0, animated: true });
    } finally {
      lock.current = false;
      setSaving(false);
    }
  }
  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={s.page}>
      <Stack.Screen
        options={{
          title: existing ? "Edit workout" : "Log workout",
          gestureEnabled: !saving,
          headerBackVisible: !saving,
        }}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={headerHeight}
      >
        <ScrollView
          ref={scroll}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={s.content}
        >
          <View style={{ gap: 8 }}>
            <Text style={s.eyebrow}>
              {existing ? "REFINE YOUR RECORD" : "MAKE IT COUNT"}
            </Text>
            <Text style={s.title}>
              {existing ? "Edit your session." : "Log your session."}
            </Text>
            <Text style={s.subtitle}>
              Same reps and weight for each set of an exercise. All weights are
              in pounds.
            </Text>
          </View>
          {error ? (
            <Text accessibilityRole="alert" style={s.error}>
              {error}
            </Text>
          ) : null}
          <Field
            label="Workout title"
            value={title}
            onChangeText={setTitle}
            placeholder="e.g. Upper body · Monday"
            maxLength={80}
            editable={!saving}
          />
          {exercises.map((e, index) => (
            <View key={e.key} style={s.card}>
              <View style={s.row}>
                <Text style={s.eyebrow}>
                  EXERCISE {String(index + 1).padStart(2, "0")}
                </Text>
                {exercises.length > 1 ? (
                  <Button
                    title={`Remove ${index + 1}`}
                    secondary
                    disabled={saving}
                    onPress={() =>
                      setExercises((prev) =>
                        prev.filter((item) => item.key !== e.key),
                      )
                    }
                  />
                ) : null}
              </View>
              <Field
                label={`Exercise ${index + 1} name`}
                value={e.name}
                onChangeText={(v) => update(e.key, "name", v)}
                placeholder="e.g. Bench press"
                maxLength={80}
                editable={!saving}
              />
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Field
                  label="Sets"
                  accessibilityLabel={`Exercise ${index + 1} sets`}
                  value={e.sets}
                  onChangeText={(v) => update(e.key, "sets", v)}
                  keyboardType="number-pad"
                  maxLength={3}
                  editable={!saving}
                />
                <Field
                  label="Reps"
                  accessibilityLabel={`Exercise ${index + 1} reps`}
                  value={e.reps}
                  onChangeText={(v) => update(e.key, "reps", v)}
                  keyboardType="number-pad"
                  maxLength={4}
                  editable={!saving}
                />
                <Field
                  label="Weight (lb)"
                  accessibilityLabel={`Exercise ${index + 1} weight`}
                  value={e.weight}
                  onChangeText={(v) => update(e.key, "weight", v)}
                  keyboardType="decimal-pad"
                  placeholder="100"
                  maxLength={8}
                  editable={!saving}
                />
              </View>
            </View>
          ))}
          <Button
            title="＋  Add exercise"
            secondary
            disabled={saving || exercises.length >= 30}
            onPress={() => setExercises((prev) => [...prev, blank()])}
          />
          <View
            style={[
              s.card,
              { borderColor: "#214B91", backgroundColor: "#11244A" },
            ]}
          >
            <Text style={s.eyebrow}>SESSION VOLUME</Text>
            <Text style={s.big}>
              {Number.isFinite(total) ? number(total) : "—"}{" "}
              <Text style={{ fontSize: 18, color: colors.muted }}>lb</Text>
            </Text>
            <Text style={s.muted}>
              Sets × reps × weight, summed across exercises. This measures
              workload, not effort.
            </Text>
          </View>
          <Field
            label="Perceived effort · optional, 1–10"
            value={effort}
            onChangeText={setEffort}
            keyboardType="number-pad"
            placeholder="1 = very easy · 10 = maximum effort"
            maxLength={2}
            editable={!saving}
          />
          <Field
            label="Session notes · optional"
            value={notes}
            onChangeText={setNotes}
            placeholder="How did it feel? Anything for next time?"
            multiline
            maxLength={1000}
            editable={!saving}
          />
          <Button
            title={
              saving ? "Saving…" : existing ? "Save changes" : "Save workout"
            }
            disabled={saving}
            onPress={() => void submit()}
          />
          <Button
            title="Cancel"
            secondary
            disabled={saving}
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.replace("/");
            }}
          />
          <Text style={s.muted}>
            Saved only on this device. Removing the app’s data removes your
            workout history.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
