import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, colors, s } from "../components/ui";
import { useWorkouts } from "../lib/store";
import { comparison, number, totalVolume, type Workout } from "../lib/workouts";
function WorkoutCard({
  workout,
  workouts,
}: {
  workout: Workout;
  workouts: Workout[];
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Edit ${workout.title}`}
      onPress={() =>
        router.push({ pathname: "/workout", params: { id: workout.id } })
      }
      style={({ pressed }) => [
        s.card,
        { marginBottom: 14, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View style={s.row}>
        <Text style={s.eyebrow}>
          {new Date(workout.createdAt)
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
            .toUpperCase()}
        </Text>
        <Text style={{ color: colors.pale }}>Edit ↗</Text>
      </View>
      <Text style={s.heading}>{workout.title}</Text>
      <View style={s.row}>
        <Text style={{ color: colors.text, fontSize: 26, fontWeight: "700" }}>
          {number(totalVolume(workout.exercises))}{" "}
          <Text style={s.muted}>lb volume</Text>
        </Text>
        <Text style={s.muted}>
          {workout.effort ? `Effort ${workout.effort}/10` : "Effort —"}
        </Text>
      </View>
      <View style={s.divider} />
      {workout.exercises.map((e) => {
        const change = comparison(workout, e, workouts);
        return (
          <View key={e.name} style={{ gap: 4 }}>
            <View style={s.row}>
              <Text style={[s.text, { flex: 1 }]}>{e.name}</Text>
              <Text
                style={{
                  color: change === null ? colors.muted : colors.pale,
                  fontSize: 12,
                }}
              >
                {change === null
                  ? "No comparison yet"
                  : `${change > 0 ? "+" : ""}${number(change)}% volume`}
              </Text>
            </View>
            <Text style={s.muted}>
              {e.sets} sets × {e.reps} reps × {number(e.weight)} lb
            </Text>
          </View>
        );
      })}
      {workout.notes ? (
        <Text style={s.muted} numberOfLines={2}>
          {workout.notes}
        </Text>
      ) : null}
    </Pressable>
  );
}
export default function History() {
  const { workouts, ready, error, retry } = useWorkouts();
  return (
    <SafeAreaView style={s.page} edges={["top", "left", "right", "bottom"]}>
      <FlatList
        data={ready ? workouts : []}
        keyExtractor={(w) => w.id}
        contentContainerStyle={s.content}
        renderItem={({ item }) => (
          <WorkoutCard workout={item} workouts={workouts} />
        )}
        ListHeaderComponent={
          <View style={{ gap: 24 }}>
            <View style={s.row}>
              <Text style={s.eyebrow}>WORKOUT / LEDGER</Text>
              <Text style={s.muted}>● ON DEVICE</Text>
            </View>
            <View style={{ gap: 8 }}>
              <Text style={s.title}>Put in the work.</Text>
              <Text style={s.subtitle}>Keep the record. See what changes.</Text>
            </View>
            <View
              style={[
                s.card,
                { backgroundColor: "#11244A", borderColor: "#214B91" },
              ]}
            >
              <Text style={s.eyebrow}>YOUR TRAINING, RECORDED</Text>
              <Text style={s.big}>
                {workouts.length}{" "}
                <Text style={{ fontSize: 18, color: colors.muted }}>
                  {workouts.length === 1 ? "workout" : "workouts"}
                </Text>
              </Text>
              <Text style={s.subtitle}>
                Volume = sets × reps × weight. Compare the same exercise with
                its previous session.
              </Text>
            </View>
            <Button
              title="＋  Log workout"
              disabled={!ready}
              onPress={() => router.push("/workout")}
            />
            <View style={s.row}>
              <Text style={s.heading}>Workout history</Text>
              <Text style={s.muted}>NEWEST FIRST</Text>
            </View>
            {error ? (
              <>
                <Text accessibilityRole="alert" style={s.error}>
                  {error}
                </Text>
                <Button
                  title="Try loading again"
                  onPress={() => void retry()}
                  secondary
                />
              </>
            ) : !ready ? (
              <ActivityIndicator
                color={colors.pale}
                accessibilityLabel="Loading workouts"
              />
            ) : null}
          </View>
        }
        ListEmptyComponent={
          ready ? (
            <View style={[s.card, { marginTop: 18 }]}>
              <Text style={s.heading}>Your first rep starts here.</Text>
              <Text style={s.subtitle}>
                Log a workout to build your history. Everything stays on this
                device, ready for your next session.
              </Text>
            </View>
          ) : undefined
        }
        ListFooterComponent={
          <Text style={[s.muted, { marginTop: 12 }]}>
            Volume tracks workload, not physical effort. Higher volume isn’t
            always better. Use your effort rating for how the workout felt.
          </Text>
        }
      />
    </SafeAreaView>
  );
}
