const cmd = require('node-cmd');

module.exports = {
    startDB: function () {
        cmd.get(
            'chdir',
            function (err, data, stderr) {
                console.log('the current working dir is : ', data);

                let command = data.replace("\r\n", "") + "\\tools\\dynamo_offline\\server_start.bat";

                cmd.run(command);
            }
        );

    }
};

