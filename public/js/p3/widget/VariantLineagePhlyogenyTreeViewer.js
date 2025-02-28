define.amd.jQuery = true
define([
  'dojo/_base/declare', 'dijit/_WidgetBase', 'dojo/text!./templates/VariantLineagePhlyogenyTreeViewer.html', 'dijit/_TemplatedMixin',
  'dojo/request',
], function (
  declare, WidgetBase, Template, Templated,
  xhr
) {
  return declare([WidgetBase, Templated], {
    baseClass: 'VariantLineagePhlyogenyTreeViewer',
    disabled: false,
    templateString: Template,
    apiServiceUrl: window.App.dataAPI,
    constructor: function () {
    },
    isloaded: false,
    startup: function () {
      if (this._started) {
        return;
      }
      this.inherited(arguments);
      this.pre_build_options();
    },
    pre_build_options: function () {
      const options = {};
      options.alignPhylogram = false; // We should launch with "regular" phylogram.
      options.branchDataFontSize = 9;
      options.defaultFont = ['Arial', 'Helvetica', 'Times'];
      options.initialNodeFillColorVisualization = 'PANGO VOC';
      options.minBranchLengthValueToShow = 0.000001;
      options.minConfidenceValueToShow = 50;
      options.phylogram = true; // We should launch with "regular" phylogram.
      options.showConfidenceValues = false;
      options.showExternalLabels = true;
      options.showNodeName = true;
      options.showLineage = false;  // NEW as of 1.8.7b1
      options.showMutations = false; // NEW as of 1.8.7b1
      options.showNodeVisualizations = true;
      options.showSequence = false; // Do not show "Sequence" upon launch.
      options.showSequenceAccession = true; // If user turns on "Sequence" display, accession will be shown.
      options.searchProperties = true;
      options.searchIsPartial = false;
      options.showBranchEvents = false;
      options.showVisualizationsLegend = true;
      options.visualizationsLegendOrientation = 'vertical';
      options.visualizationsLegendXpos = 160;
      options.visualizationsLegendYpos = 30;

      const settings = {};
      settings.border = '1px solid #909090';
      settings.controls0Top = 10;
      settings.controls1Top = 10; // Should have both boxes in line.
      // settings.displayHeight = 700;
      // settings.displayWidth = 1200;
      settings.enableAccessToDatabases = true;
      settings.enableCollapseByFeature = false;
      settings.enableDownloads = true;
      settings.enableNodeVisualizations = true;
      settings.enableDynamicSizing = true;
      settings.enableSpecialVisualizations2 = true;
      settings.enableSpecialVisualizations3 = true;
      settings.enableSpecialVisualizations4 = true;
      settings.nhExportWriteConfidences = true;
      settings.searchFieldWidth = '50px';
      settings.collapseLabelWidth = '36px';
      settings.textFieldHeight = '16px';
      settings.showLineageButton = true;
      settings.showMutationsButton = true;
      settings.showShortenNodeNamesButton = false;
      settings.showDynahideButton = false;
      settings.showSearchPropertiesButton = true;
      settings.dynamicallyAddNodeVisualizations = true;
      settings.propertiesToIgnoreForNodeVisualization = ['AccessionNumber', 'Mutation'];
      settings.filterValues = [{
        source: 'vipr:PANGO_Lineage',
        target: 'vipr:PANGO_Select_Lineage',
        pass: ['BA.1', 'BA.2', 'BA.3', 'BA.4', 'BA.5', 'B.1.1.7', 'B.1.351', 'P.1', 'B.1.617.2', 'B.1.1.529']
      }];

      const decorator = 'vipr:';

      const nodeVisualizations = {};

      nodeVisualizations['PANGO_Lineage'] = {
        label: 'PANGO Lineage',
        description: 'the PANGO Lineage',
        field: null,
        cladeRef: decorator + 'PANGO_Lineage',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category50',
        sizes: null
      };

      nodeVisualizations['PANGO_Lineage_L0'] = {
        label: 'PANGO Lineage Lvl 0',
        description: 'the PANGO Lineage Level 0',
        field: null,
        cladeRef: decorator + 'PANGO_Lineage_L0',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category50',
        sizes: null
      };

      nodeVisualizations['PANGO_Lineage_L1'] = {
        label: 'PANGO Lineage Lvl 1',
        description: 'the PANGO Lineage Level 1',
        field: null,
        cladeRef: decorator + 'PANGO_Lineage_L1',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category50',
        sizes: null
      };

      nodeVisualizations['PANGO_Select_Lineage'] = {
        label: 'PANGO VOC',
        description: 'PANGO VOC',
        field: null,
        cladeRef: decorator + 'PANGO_Select_Lineage',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category50',
        sizes: null
      };

      nodeVisualizations['Host'] = {
        label: 'Host',
        description: 'the host of the virus',
        field: null,
        cladeRef: decorator + 'Host',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category10',
        sizes: null
      };

      nodeVisualizations['Country'] = {
        label: 'Country',
        description: 'the country of the virus',
        field: null,
        cladeRef: decorator + 'Country',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category50',
        sizes: null
      };

      nodeVisualizations['Year'] = {
        label: 'Year',
        description: 'the year of the virus',
        field: null,
        cladeRef: decorator + 'Year',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category50',
        colorsAlt: ['#000000', '#00FF00'],
        sizes: [10, 40]
      };

      nodeVisualizations['Region'] = {
        label: 'Region',
        description: 'the region of change',
        field: null,
        cladeRef: decorator + 'Region',
        regex: false,
        shapes: ['square', 'diamond', 'triangle-up', 'triangle-down', 'cross', 'circle'],
        colors: 'category50',
        sizes: null
      };


      const specialVisualizations = {};

      specialVisualizations['Mutations'] = {
        label: 'Mutations',
        applies_to_ref: decorator + 'Mutation',
        property_datatype: 'xsd:string',
        property_applies_to: 'node',
        color: '#0000FF',
        property_values: ['S:-142A', 'S:-142S', 'S:-211N', 'S:-241L', 'S:-242L', 'S:-243A', 'S:-246R', 'S:-247S', 'S:-248Y', 'S:-249L', 'S:-250T', 'S:-251P', 'S:-252G', 'S:A1020D', 'S:A1020V',
          'S:A1056V', 'S:A1070S', 'S:A1078T', 'S:A1174V', 'S:A1190S', 'S:A163V', 'S:A243S', 'S:A263V', 'S:A264V', 'S:A288T', 'S:A352V', 'S:A372P', 'S:A411S', 'S:A475S', 'S:A475V', 'S:A623S',
          'S:A626T', 'S:A67-', 'S:A684V', 'S:A688T', 'S:A694V', 'S:A735S', 'S:A783G', 'S:A783T', 'S:A829T', 'S:A831V', 'S:A852S', 'S:A871S', 'S:A892V', 'S:A903S', 'S:A944S', 'S:A958S', 'S:A982S',
          'S:C1236S', 'S:C1240F', 'S:C1243Y', 'S:C1247Y', 'S:C1248R', 'S:C1253Y', 'S:C1254W', 'S:C136-', 'S:D1084G', 'S:D1139H', 'S:D1139Y', 'S:D1146H', 'S:D1146Y', 'S:D1168G', 'S:D1168N',
          'S:D1184N', 'S:D1184Y', 'S:D1199Y', 'S:D1259V', 'S:D1260H', 'S:D1260Y', 'S:D138G', 'S:D178G', 'S:D178H', 'S:D178N', 'S:D215A', 'S:D215G', 'S:D253A', 'S:D287G', 'S:D339N', 'S:D427G',
          'S:D427N', 'S:D53N', 'S:D574N', 'S:D614N', 'S:D745G', 'S:D796G', 'S:D796N', 'S:D808H', 'S:D80A', 'S:D80N', 'S:D839V', 'S:D936G', 'S:D979E', 'S:E1092K', 'S:E1111G', 'S:E1111K', 'S:E1150D',
          'S:E1258V', 'S:E1262D', 'S:E1262K', 'S:E154G', 'S:E154V', 'S:E156-', 'S:E180Q', 'S:E309K', 'S:E324V', 'S:E406Q', 'S:E471Q', 'S:E484D', 'S:E484G', 'S:E554Q', 'S:E654K', 'S:E654V', 'S:E661D',
          'S:E780A', 'S:E780D', 'S:E868G', 'S:E918V', 'S:E96D', 'S:E96V', 'S:F1052Y', 'S:F1062L', 'S:F1103L', 'S:F1176V', 'S:F135-', 'S:F140L', 'S:F186L', 'S:F18L', 'S:F201L', 'S:F32L', 'S:F338L',
          'S:F374L', 'S:F486L', 'S:F486V', 'S:F486Y', 'S:F59S', 'S:F59Y', 'S:F888L', 'S:F981L', 'S:G1085R', 'S:G1167A', 'S:G1167R', 'S:G1167S', 'S:G1167V', 'S:G1171V', 'S:G1223S', 'S:G1267E', 'S:G184V',
          'S:G199R', 'S:G252-', 'S:G261C', 'S:G261D', 'S:G261R', 'S:G261V', 'S:G35R', 'S:G446A', 'S:G446D', 'S:G446R', 'S:G476S', 'S:G485R', 'S:G496S', 'S:G72E', 'S:G72R', 'S:G769R', 'S:G838S', 'S:G842V',
          'S:G946V', 'S:H1058Y', 'S:H1083Q', 'S:H146R', 'S:H625Y', 'S:H66P', 'S:H681R', 'S:H69Y', 'S:H796Y', 'S:H954Q', 'S:I1018V', 'S:I1081V', 'S:I1114S', 'S:I1130M', 'S:I1130V', 'S:I1179V', 'S:I119V',
          'S:I1221V', 'S:I1227T', 'S:I1232F', 'S:I197V', 'S:I19L', 'S:I210T', 'S:I212L', 'S:I231M', 'S:I68T', 'S:I714V', 'S:I716T', 'S:I844V', 'S:I850L', 'S:I931V', 'S:K1038R', 'S:K1045N', 'S:K113N',
          'S:K1181T', 'S:K1245R', 'S:K129R', 'S:K150T', 'S:K182R', 'S:K202T', 'S:K278E', 'S:K278N', 'S:K300R', 'S:K417T', 'S:K444N', 'S:K484E', 'S:K537R', 'S:K558N', 'S:K764N', 'S:K77M', 'S:K77T',
          'S:K814M', 'S:K835R', 'S:K921Q', 'S:K97E', 'S:K97M', 'S:L1049I', 'S:L1141W', 'S:L118F', 'S:L1224S', 'S:L1244V', 'S:L141F', 'S:L141V', 'S:L189F', 'S:L18R', 'S:L229F', 'S:L241F', 'S:L242P',
          'S:L244S', 'S:L249-', 'S:L249S', 'S:L293H', 'S:L441F', 'S:L455F', 'S:L585F', 'S:L858I', 'S:L8V', 'S:L922F', 'S:L981F', 'S:M1029S', 'S:M1050I', 'S:M1229L', 'S:M1237V', 'S:M731I', 'S:M731T',
          'S:M900I', 'S:N1023D', 'S:N1023S', 'S:N1074D', 'S:N1074S', 'S:N1158S', 'S:N1173K', 'S:N1187H', 'S:N1192S', 'S:N137-', 'S:N148Y', 'S:N185S', 'S:N211Y', 'S:N253D', 'S:N30K', 'S:N339H', 'S:N354D',
          'S:N370S', 'S:N450K', 'S:N460I', 'S:N460Y', 'S:N501H', 'S:N556K', 'S:N556Y', 'S:N641D', 'S:N658D', 'S:N658S', 'S:N679Y', 'S:N703D', 'S:N710S', 'S:N710T', 'S:N717S', 'S:N74K', 'S:N751D', 'S:N751K',
          'S:N856S', 'S:N925S', 'S:N969K', 'S:P1112Q', 'S:P1162L', 'S:P1263Q', 'S:P174S', 'S:P251-', 'S:P251L', 'S:P251S', 'S:P25H', 'S:P25L', 'S:P25S', 'S:P25T', 'S:P330S', 'S:P384S', 'S:P479L', 'S:P499R',
          'S:P521R', 'S:P621S', 'S:P728S', 'S:P82L', 'S:P9S', 'S:Q1071H', 'S:Q1113K', 'S:Q1201H', 'S:Q1208R', 'S:Q173K', 'S:Q218H', 'S:Q218R', 'S:Q23H', 'S:Q23L', 'S:Q314R', 'S:Q321-', 'S:Q414K', 'S:Q493E',
          'S:Q52H', 'S:Q628K', 'S:Q675K', 'S:Q677E', 'S:Q677R', 'S:Q690L', 'S:Q804H', 'S:Q954H', 'S:Q957R', 'S:R102G', 'S:R102K', 'S:R102S', 'S:R1091L', 'S:R158S', 'S:R190K', 'S:R19I', 'S:R21S', 'S:R237S',
          'S:R246T', 'S:R273K', 'S:R273S', 'S:R34C', 'S:R34P', 'S:R403G', 'S:R403K', 'S:R408I', 'S:R408K', 'S:R408S', 'S:R493Q', 'S:R634L', 'S:R646P', 'S:R681H', 'S:R682W', 'S:R78G', 'S:S112L', 'S:S1147A',
          'S:S12C', 'S:S151T', 'S:S155R', 'S:S158R', 'S:S162I', 'S:S190R', 'S:S221A', 'S:S255P', 'S:S256L', 'S:S27P', 'S:S371F', 'S:S371L', 'S:S408R', 'S:S446G', 'S:S494L', 'S:S520A', 'S:S640P', 'S:S658N',
          'S:S689N', 'S:S698L', 'S:S71F', 'S:S732A', 'S:S735A', 'S:S813I', 'S:S813N', 'S:S884F', 'S:S929I', 'S:S937L', 'S:S937T', 'S:S982L', 'S:T1006I', 'S:T1009S', 'S:T1116N', 'S:T1120I', 'S:T1120S',
          'S:T1273I', 'S:T20N', 'S:T240P', 'S:T250-', 'S:T250A', 'S:T250P', 'S:T250S', 'S:T259I', 'S:T259R', 'S:T307I', 'S:T323I', 'S:T33A', 'S:T33I', 'S:T376A', 'S:T385S', 'S:T470N', 'S:T478A', 'S:T478I',
          'S:T501Y', 'S:T51I', 'S:T547K', 'S:T549S', 'S:T553I', 'S:T604I', 'S:T618I', 'S:T638A', 'S:T638I', 'S:T63I', 'S:T676S', 'S:T678S', 'S:T723I', 'S:T732A', 'S:T732S', 'S:T73I', 'S:T761I', 'S:T76S',
          'S:T778I', 'S:T881P', 'S:T941A', 'S:T95N', 'S:V1040F', 'S:V1128A', 'S:V1128I', 'S:V1133I', 'S:V1230M', 'S:V127F', 'S:V159I', 'S:V171I', 'S:V213A', 'S:V213G', 'S:V213L', 'S:V222A', 'S:V227L',
          'S:V289I', 'S:V308I', 'S:V320I', 'S:V327I', 'S:V362F', 'S:V36F', 'S:V382L', 'S:V395I', 'S:V3G', 'S:V445F', 'S:V483A', 'S:V483F', 'S:V503G', 'S:V503I', 'S:V615I', 'S:V622G', 'S:V635I', 'S:V67A',
          'S:V687I', 'S:V687L', 'S:V688A', 'S:V6I', 'S:V772I', 'S:V826L', 'S:Y1155F', 'S:Y138D', 'S:Y200H', 'S:Y248H', 'S:Y265C', 'S:Y28F', 'S:Y28H', 'S:Y396H', 'S:Y449N', 'S:Y49H', 'S:Y508H', 'S:Y660F',
          'S:Y789H', 'S:Y904C']
      };

      specialVisualizations['Convergent_Mutations'] = {
        label: 'Convergent Mutations',
        applies_to_ref: decorator + 'Mutation',
        property_datatype: 'xsd:string',
        property_applies_to: 'node',
        color: '#FF0000',
        property_values: ['S:-142D', 'S:-142G', 'S:-143V', 'S:-144Y', 'S:-145Y', 'S:-157F', 'S:-158R', 'S:-69H', 'S:-70V', 'S:A1020S', 'S:A1078S', 'S:A1087S', 'S:A222V', 'S:A243-', 'S:A243V', 'S:A262S',
          'S:A27S', 'S:A27V', 'S:A344S', 'S:A348S', 'S:A520S', 'S:A522S', 'S:A522V', 'S:A570D', 'S:A623V', 'S:A626S', 'S:A647S', 'S:A653V', 'S:A67S', 'S:A67V', 'S:A688V', 'S:A701T', 'S:A701V', 'S:A706V',
          'S:A771S', 'S:A845S', 'S:A845V', 'S:A846S', 'S:A879S', 'S:A879V', 'S:A892S', 'S:A899S', 'S:C1235F', 'S:C1236F', 'S:C1247F', 'S:C1250F', 'S:C136F', 'S:D1118H', 'S:D1118Y', 'S:D111N', 'S:D1163Y',
          'S:D1259Y', 'S:D138-', 'S:D138H', 'S:D138Y', 'S:D215-', 'S:D215Y', 'S:D253G', 'S:D253N', 'S:D405N', 'S:D614G', 'S:D737Y', 'S:D796H', 'S:D796Y', 'S:D808G', 'S:D80G', 'S:D80Y', 'S:D839Y', 'S:D88H',
          'S:D936H', 'S:D936N', 'S:D936Y', 'S:D950H', 'S:D950N', 'S:E1202Q', 'S:E154K', 'S:E156G', 'S:E224Q', 'S:E309Q', 'S:E484A', 'S:E484K', 'S:E484Q', 'S:E554D', 'S:E583D', 'S:E654Q', 'S:E780Q', 'S:E96Q',
          'S:F140-', 'S:F157-', 'S:F157L', 'S:F157S', 'S:F186S', 'S:F306L', 'S:F490S', 'S:F565L', 'S:G1124V', 'S:G1219C', 'S:G1219V', 'S:G1251V', 'S:G156E', 'S:G181A', 'S:G181V', 'S:G252V', 'S:G257S', 'S:G339D',
          'S:G446S', 'S:G446V', 'S:G614D', 'S:G75R', 'S:G75V', 'S:G769V', 'S:G798D', 'S:H1101Y', 'S:H146Y', 'S:H245-', 'S:H245Y', 'S:H49Y', 'S:H655Y', 'S:H681P', 'S:H69-', 'S:I1027T', 'S:I1221T', 'S:I210-',
          'S:I233V', 'S:I68-', 'S:I68V', 'S:I818V', 'S:I834T', 'S:I834V', 'S:I95T', 'S:K1073N', 'S:K1191N', 'S:K346R', 'S:K417N', 'S:K440N', 'S:K478T', 'S:K854N', 'S:K97N', 'S:L1063F', 'S:L1265F', 'S:L141-',
          'S:L176F', 'S:L18F', 'S:L212I', 'S:L216F', 'S:L241-', 'S:L242-', 'S:L242F', 'S:L244-', 'S:L452M', 'S:L452Q', 'S:L452R', 'S:L54F', 'S:L5F', 'S:L822F', 'S:L8F', 'S:L938F', 'S:M1229I', 'S:M1237I',
          'S:M153I', 'S:M153T', 'S:M177I', 'S:N1187Y', 'S:N148T', 'S:N211-', 'S:N211K', 'S:N394S', 'S:N417K', 'S:N417T', 'S:N439K', 'S:N440K', 'S:N501T', 'S:N501Y', 'S:N641S', 'S:N679K', 'S:N764K', 'S:N856K',
          'S:N950D', 'S:N978S', 'S:P1112L', 'S:P1162S', 'S:P1263L', 'S:P139-', 'S:P217S', 'S:P26L', 'S:P26S', 'S:P384L', 'S:P479S', 'S:P681H', 'S:P681L', 'S:P681R', 'S:P809S', 'S:P812L', 'S:P812S', 'S:P9L',
          'S:Q1071L', 'S:Q1208H', 'S:Q173H', 'S:Q183H', 'S:Q271R', 'S:Q321L', 'S:Q414R', 'S:Q493R', 'S:Q498R', 'S:Q52R', 'S:Q613H', 'S:Q675H', 'S:Q675R', 'S:Q677H', 'S:Q957L', 'S:R102I', 'S:R158-', 'S:R18L',
          'S:R190S', 'S:R19T', 'S:R214L', 'S:R21I', 'S:R21T', 'S:R246-', 'S:R246G', 'S:R346K', 'S:R346S', 'S:R452L', 'S:R78M', 'S:S1242I', 'S:S1252F', 'S:S1261F', 'S:S12F', 'S:S13I', 'S:S151I', 'S:S221L',
          'S:S247-', 'S:S247I', 'S:S254F', 'S:S255F', 'S:S373P', 'S:S375F', 'S:S477I', 'S:S477N', 'S:S494P', 'S:S50L', 'S:S514F', 'S:S640F', 'S:S673T', 'S:S680F', 'S:S689I', 'S:S691F', 'S:S704L', 'S:S929T',
          'S:S939F', 'S:S940F', 'S:S982A', 'S:S98F', 'S:T1027I', 'S:T1117I', 'S:T19I', 'S:T19R', 'S:T20I', 'S:T22I', 'S:T22N', 'S:T236S', 'S:T250I', 'S:T284I', 'S:T299I', 'S:T29A', 'S:T29I', 'S:T385I',
          'S:T478K', 'S:T478R', 'S:T547I', 'S:T572I', 'S:T573I', 'S:T678I', 'S:T716I', 'S:T719I', 'S:T747I', 'S:T76I', 'S:T791I', 'S:T859I', 'S:T859N', 'S:T883I', 'S:T95A', 'S:T95I', 'S:V1104L', 'S:V1122L',
          'S:V1133F', 'S:V1176F', 'S:V1228L', 'S:V1264L', 'S:V143-', 'S:V143F', 'S:V16F', 'S:V308L', 'S:V367F', 'S:V367L', 'S:V622F', 'S:V622I', 'S:V6F', 'S:V70-', 'S:V70F', 'S:V70I', 'S:W152C', 'S:W152L',
          'S:W152R', 'S:W258L', 'S:W64L', 'S:W64R', 'S:Y144-', 'S:Y144F', 'S:Y145-', 'S:Y145H', 'S:Y248-', 'S:Y449H', 'S:Y453F', 'S:Y505H', 'S:Y796D']
      };

      specialVisualizations[decorator + 'PANGO_Lineage'] = {
        label: 'PANGO VOC',
        applies_to_ref: decorator + 'PANGO_Lineage',
        property_datatype: 'xsd:string',
        property_applies_to: 'node',
        color: '#FF0000',
        property_values: ['BA.1', 'BA.2', 'BA.3', 'BA.4', 'BA.5', 'B.1.1.7', 'B.1.351', 'P.1', 'B.1.617.2', 'B.1.1.529']
      };

      this.options = options;
      this.settings = settings;
      this.nodeVisualizations = nodeVisualizations;
      this.specialVisualizations = specialVisualizations;
    },
    _setStateAttr: function () {
      if (!this.isloaded) {
        this.load_once();
        this.isloaded = true;
      }
    },
    load_once: function () {
      var options = this.options;
      var settings = this.settings;
      var nodeVisualizations = this.nodeVisualizations;
      var specialVisualizations = this.specialVisualizations;

      xhr.get(window.App.dataAPI + '/content/phyloxml_trees/SARS2_IT17_29400_09999_cdh_pango_4_MAFFT_05_GTR_fme_pdvxvm.xml')
        .then((data) => {
          var tree;
          try {
            tree = window.archaeopteryx.parsePhyloXML(data);
          }
          catch (e) {
            alert('error while parsing tree: ' + e);
          }
          if (tree) {
            try {
              window.archaeopteryx.launch('#phylogram1', tree, options, settings, nodeVisualizations, specialVisualizations);
            }
            catch (e) {
              alert('error while launching archaeopteryx: ' + e);
            }
          }
        })
    }
  });
});
