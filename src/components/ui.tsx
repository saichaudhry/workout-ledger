import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
export const colors = { bg: '#080B12', panel: '#111827', border: '#263249', blue: '#3378FF', pale: '#96BAFF', text: '#F5F7FC', muted: '#A2ADC1', green: '#83E7C2' };
export function Button({ title, onPress, secondary = false, disabled = false }: { title: string; onPress: () => void; secondary?: boolean; disabled?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress} style={({ pressed }) => [s.button, secondary && s.secondary, (pressed || disabled) && { opacity: 0.55 }]}><Text style={s.buttonText}>{title}</Text></Pressable>;
}
export function Field({ label, ...props }: TextInputProps & { label: string }) {
  return <View style={{ gap: 8, flex: 1 }}><Text style={s.label}>{label}</Text><TextInput accessibilityLabel={label} placeholderTextColor="#7E8AA1" selectionColor={colors.pale} {...props} style={[s.input, props.multiline && { minHeight: 94, textAlignVertical: 'top' }, props.style]} /></View>;
}
export const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg }, content: { padding: 22, paddingBottom: 40, gap: 22, width: '100%', maxWidth: 680, alignSelf: 'center' },
  eyebrow: { color: colors.pale, fontWeight: '700', fontSize: 12, letterSpacing: 2 }, title: { color: colors.text, fontSize: 34, fontWeight: '800', letterSpacing: -1 }, subtitle: { color: colors.muted, fontSize: 15, lineHeight: 23 },
  card: { backgroundColor: colors.panel, borderWidth: 1, borderColor: colors.border, borderRadius: 20, padding: 20, gap: 14 }, row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  heading: { color: colors.text, fontSize: 19, fontWeight: '700', flexShrink: 1 }, text: { color: colors.text, fontSize: 15 }, muted: { color: colors.muted, fontSize: 13, lineHeight: 20 },
  label: { color: colors.muted, fontSize: 13, fontWeight: '600' }, input: { color: colors.text, backgroundColor: '#0B111E', borderColor: '#34435C', borderWidth: 1, borderRadius: 12, padding: 14, fontSize: 16, minHeight: 50 },
  button: { backgroundColor: colors.blue, minHeight: 52, borderRadius: 14, paddingVertical: 15, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }, secondary: { backgroundColor: '#1B2941', borderWidth: 1, borderColor: '#34435C' }, buttonText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  error: { color: '#FFB6BE', backgroundColor: '#351823', padding: 16, borderRadius: 12, lineHeight: 22 }, divider: { height: 1, backgroundColor: colors.border }, big: { color: colors.text, fontSize: 38, fontWeight: '800', letterSpacing: -1 },
});
