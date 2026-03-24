/**
 * PDF report document - uses @react-pdf/renderer
 */

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ReportData } from "./types";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 10 },
  header: { marginBottom: 24 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  subtitle: { fontSize: 9, color: "#666" },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 12, fontWeight: "bold", marginBottom: 8 },
  row: { flexDirection: "row", marginBottom: 4 },
  cell: { flex: 1 },
  tableHeader: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ccc", paddingBottom: 4, marginBottom: 4 },
  disclaimer: { fontSize: 8, color: "#888", marginTop: 24, fontStyle: "italic" },
});

interface ComparisonReportPdfProps {
  data: ReportData;
}

export function ComparisonReportPdf({ data }: ComparisonReportPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Mattsnoop Comparison Report</Text>
          <Text style={styles.subtitle}>
            Generated {new Date(data.generatedAt).toLocaleDateString()} · {data.location} · {data.intent}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Properties compared</Text>
          {data.properties.map((p) => (
            <View key={p.listing.id} style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: "bold" }}>{p.listing.address}</Text>
              <Text>{p.listing.displayPrice} · Vibe: {p.vibe.score} ({p.vibe.label})</Text>
              {p.monthlyCost != null && (
                <Text>Est. monthly: £{p.monthlyCost.toFixed(0)}</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comparison</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, { flex: 2 }]}>Address</Text>
            <Text style={styles.cell}>Price</Text>
            <Text style={styles.cell}>Monthly</Text>
            <Text style={styles.cell}>Vibe</Text>
          </View>
          {data.properties.map((p) => (
            <View key={p.listing.id} style={styles.row}>
              <Text style={[styles.cell, { flex: 2 }]}>{p.listing.address.slice(0, 40)}…</Text>
              <Text style={styles.cell}>{p.listing.displayPrice}</Text>
              <Text style={styles.cell}>{p.monthlyCost != null ? `£${p.monthlyCost.toFixed(0)}` : "—"}</Text>
              <Text style={styles.cell}>{p.vibe.score}</Text>
            </View>
          ))}
        </View>

        {data.recommendations && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            {data.recommendations.bestValue && (
              <Text>· Best value: {data.recommendations.bestValue}</Text>
            )}
            {data.recommendations.bestLifestyle && (
              <Text>· Best lifestyle: {data.recommendations.bestLifestyle}</Text>
            )}
            {data.recommendations.bestQuiet && (
              <Text>· Best quiet: {data.recommendations.bestQuiet}</Text>
            )}
          </View>
        )}

        <Text style={styles.disclaimer}>
          Estimates are modelled outputs. Utilities, insurance and market scores may vary.
          Negotiation score is indicative only. Verify legal and financial matters independently.
        </Text>
      </Page>
    </Document>
  );
}
