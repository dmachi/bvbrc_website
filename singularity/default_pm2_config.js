module.exports = {
  apps : [{
		name   : "bvbrc_web",
		script : "./app.js",
		cwd: "/bvbrc_web",
		instances: 1,
		exec_mode: "cluster",
		log_file: "/logs/bvbrc_web.log",
		error_file: "NULL",
		out_file: "NULL",
		combine_logs: true,
		kill_timeout : 10000
	}]
}

