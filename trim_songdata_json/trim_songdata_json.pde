JSONObject in, out;

//config
String jsonpath = "/Users/philipmeyer/Projects/berg-intro-visual/data/bergintro_means.json";
String filename = "/Users/philipmeyer/Projects/berg-intro-visual/data/bergintro_trimmed.json";

void setup() {
  size(100, 100);
  loadData();
}

void loadData() {
  out = new JSONObject();
  in = loadJSONObject(jsonpath);
  println("loaded "+jsonpath);
  JSONObject razor = in.getJSONObject("razor");
  //JSONObject udu = in.getJSONObject("udu");
  JSONArray razorLoudness = razor.getJSONArray("LoudnessMean");
  //JSONArray uduLoudness = udu.getJSONArray("LoudnessMean");
  out.setJSONArray("razor", razorLoudness);
  //out.setJSONArray("udu", uduLoudness);
  saveJSONObject(out, filename);
  println("created file "+filename);
}  
