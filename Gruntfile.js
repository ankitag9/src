var childProcess = require('child_process');
var moment = require('moment');
var Config = require('./common/Config');

function init(grunt) {
    var timestamp = moment().format('DD_MMM_YYYY_hh_mm_ss');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        "backups_dir": '/var/captain/backups',
        "deploy_dir": grunt.option('buildId') ? 'build-' + grunt.option('buildId') + '/' : './',
        "seed": new Date().getTime(),
        "create-alter-script": {
            "target": {}
        },
        "update-db": {
            "originalDb": {
                "db": Config.get(Config.DATABASE_NAME)
            },
            "refDb": {
                "db": Config.get(Config.REF_DATABASE_NAME)
            }
        },
        "create-db": {
            "originalDb": {
                "db": Config.get(Config.DATABASE_NAME)
            },
            "refDb": {
                "db": Config.get(Config.REF_DATABASE_NAME)
            }
        },
        "sync-changeLog": {
            "target": {}
        }
    });

    grunt.registerMultiTask("create-alter-script", function () {
        var dbUsername = Config.get(Config.DATABASE_USER);
        var dbPassword = Config.get(Config.DATABASE_PASS);
        var dbname = Config.get(Config.DATABASE_NAME);
        var refDbname = Config.get(Config.REF_DATABASE_NAME);

        var command = 'java -jar sql/liquibase.jar --classpath=sql/mysql-connector-java-5.1.30-bin.jar ' + '--changeLogFile=sql/changelog.xml --url="jdbc:mysql://localhost/' + refDbname + '" --username=' + dbUsername + ' --password=' + dbPassword + ' diffChangeLog ' + '--referenceUrl=jdbc:mysql://localhost/' + dbname + ' --referenceUsername=' + dbUsername + ' --referencePassword=' + dbPassword;

        //in command, original db is used in reference as liquibase generate changeSet to convert db specified in url to db specified in refUrl
        var exec = childProcess.exec;

        console.log(command);
        var done = this.async();
        exec(command, function (error, stdout, stderr) {
            console.log("Change Log generated");
            console.log(stdout);
            console.log(stderr);
            done();
        });
    });

    grunt.registerMultiTask('update-db', function () {
        var dbName = this.data.db;
        var dbUsername = Config.get(Config.DATABASE_USER);
        var dbPassword = Config.get(Config.DATABASE_PASS);

        var command = 'java -jar sql/liquibase.jar --classpath=sql/mysql-connector-java-5.1.30-bin.jar ' + '--changeLogFile=sql/changelog.xml --url="jdbc:mysql://localhost/' + dbName + '" --username=' + dbUsername + ' --password=' + dbPassword + ' update';

        var exec = childProcess.exec;

        console.log(command);
        var done = this.async();
        exec(command, function (error, stdout, stderr) {
            console.log(dbName + " updated");
            console.log(stdout);
            console.log(stderr);
            done();
        });
    });

    /* Custom Task - changeLongSync for liquibase to apply generated change set to source database after generating changeset */
    grunt.registerMultiTask('sync-changeLog', function () {
        var dbName = Config.get(Config.DATABASE_NAME);
        var dbUsername = Config.get(Config.DATABASE_USER);
        var dbPassword = Config.get(Config.DATABASE_PASS);

        var command = 'java -jar sql/liquibase.jar --classpath=sql/mysql-connector-java-5.1.30-bin.jar ' + '--changeLogFile=sql/changelog.xml --url="jdbc:mysql://localhost/' + dbName + '" --username=' + dbUsername + ' --password=' + dbPassword + ' changeLogSync';

        var exec = childProcess.exec;

        console.log(command);
        var done = this.async();
        exec(command, function (error, stdout, stderr) {
            console.log("Change Log Synced");
            console.log(stdout);
            console.log(stderr);
            done();
        });
    });

    grunt.registerMultiTask('create-db', function () {
        var dbName = this.data.db;
        var dbUsername = Config.get(Config.DATABASE_USER);
        var dbPassword = Config.get(Config.DATABASE_PASS);

        var command = 'java -jar sql/liquibase.jar --classpath=sql/mysql-connector-java-5.1.30-bin.jar ' + '--changeLogFile=sql/create.xml --url="jdbc:mysql://localhost/' + dbName + '" --username=' + dbUsername + ' --password=' + dbPassword + ' update';

        var exec = childProcess.exec;

        console.log(command);
        var done = this.async();
        exec(command, function (error, stdout, stderr) {
            console.log(dbName + " created");
            console.log(stdout);
            console.log(stderr);
            done();
        });
    });

    /*grunt.registerMultiTask("typescript", function ()
    {
    var exec = childProcess.exec;
    var done = this.async();
    exec('tsc -m commonjs app.ts', function (error, stdout, stderr)
    {
    console.log(stdout);
    console.log(stderr);
    done();
    });
    });*/
    /* Shorthands */
    grunt.registerTask('generate-change-set', ['create-alter-script', 'update-db:refDb:db', 'sync-changeLog']);
}

module.exports = init;
//# sourceMappingURL=Gruntfile.js.map
