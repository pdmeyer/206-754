JSONObject in, out;

//config
String jsonpath = "/Users/philipmeyer/Projects/covd-visual/data/covid_means.json";
String filename = "/Users/philipmeyer/Projects/covd-visual/data/covid_trimmed.json";

void setup() {
  size(100, 100);
  loadData();
}

void loadData() {
  out = new JSONObject();
  in = loadJSONObject(jsonpath);
  println("loaded "+jsonpath);
  JSONArray otTone = in.getJSONObject("otTone").getJSONArray("EnergyMean");
  JSONArray radiodrone = in.getJSONObject("radiodrone").getJSONArray("FrequencyMean");
  JSONArray outside = in.getJSONObject("outside").getJSONArray("AC1Mean");
  out.setJSONArray("otTone", otTone);
  out.setJSONArray("radiodrone", radiodrone);
  out.setJSONArray("outside", outside);
  saveJSONObject(out, filename);
  println("created file "+filename);
}  
