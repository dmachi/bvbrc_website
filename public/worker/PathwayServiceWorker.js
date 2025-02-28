function parseData(data, genome_list, primaryKey) {
  var data_dict = {};
  var key_list = [];
  var print_one = false;
  data.forEach(function (obj) {
    if (!obj['genome_id']) {
      return; // TODO: shouldn't happen but did for EC-numbers
    }
    if (!genome_list.includes(obj['genome_id'].toString())) {
      return;
    }
    var pathwayKey = obj[primaryKey];
    if (key_list.includes(pathwayKey)) { // add values per genome to get final counts
      if (print_one) {
        console.log('key = ', pathwayKey);
        console.log('genomeData genome_count: ', data_dict[pathwayKey]['genome_count']);
        console.log('obj genome_count: ', obj['genome_count']);
        print_one = false;
      }
      data_dict[pathwayKey]['genome_count'] += parseInt(obj['genome_count']);
      data_dict[pathwayKey]['ec_count'] += parseInt(obj['ec_count']);
      data_dict[pathwayKey]['gene_count'] += parseInt(obj['gene_count']);
      data_dict[pathwayKey]['genome_ec'] += parseInt(obj['genome_ec']);
    } else { // initialize entry with first occurence, includes other information fields which may differ per genome
      data_dict[pathwayKey] = {};
      Object.keys(obj).forEach(function (field) {
        if (field !== 'genome_id') {
          var isnum = /^\d+$/.test(obj[field]);
          // Number.isInteger(parseInt(obj[field]))
          if (field !== 'pathway_id' && isnum) {
            data_dict[pathwayKey][field] = parseInt(obj[field]);
          } else {
            data_dict[pathwayKey][field] = obj[field];
          }
        }
      });
      data_dict[pathwayKey]['_id'] = pathwayKey;
      key_list.push(pathwayKey);
    }
  });
  return Object.values(data_dict);
}

onmessage = (msg) => {
  console.log('in onmessage worker: ', JSON.parse(msg.data));
  var { type, payload } = JSON.parse(msg.data);
  switch (type) {
    case 'parse_data':
      var genome_ids = payload.genome_ids;
      var data = payload.data;
      var key = payload.primaryKey;
      var parsed_data = parseData(data, genome_ids, key);
      postMessage({ type: 'parsed_data', data: parsed_data });
  }
}
