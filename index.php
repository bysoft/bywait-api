<?php




$main = require_once 'lib/base.php';

$main->set('DEBUG', 3);
$main->set('UI', 'ui/');
$main->set('DB',
  new DB(
    'mysql:host=localhost;port=3306;dbname=waitingdb',
    'root',
    'bys0ft'
  )
);


$main->route('GET /',
	function() {
		F3::set('modules',
			array(
				'apc'=>
					'Cache engine',
				'gd'=>
					'Graphics plugin',
				'hash'=>
					'Framework core',
				'imap'=>
					'Authentication',
				'json'=>
					'Various plugins',
				'ldap'=>
					'Authentication',
				'memcache'=>
					'Cache engine',
				'mongo'=>
					'M2 MongoDB mapper',
				'pcre'=>
					'Framework core',
				'pdo_mssql'=>
					'SQL handler, Axon ORM, Authentication',
				'pdo_mysql'=>
					'SQL handler, Axon ORM, Authentication',
				'pdo_pgsql'=>
					'SQL handler, Axon ORM, Authentication',
				'pdo_sqlite'=>
					'SQL handler, Axon ORM, Authentication',
				'session'=>
					'Framework core',
				'sockets'=>
					'Network plugin',
				'xcache'=>
					'Cache engine'
			)
		);
		echo Template::serve('welcome.htm');
	}
);


$main->route('GET /v1/waiting',
  function() {
        $name = F3::get('PARAMS["name"]');
        header('Cache-Control: no-cache, must-revalidate');
        header('Expires: Mon, 26 Jul 2013 05:00:00 GMT');
        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        $personData = DB::sql('SELECT name, phone,field1,field2 FROM seatTables');
        echo json_encode($personData);
	}
);

$main->route('POST /v1/waiting/@name/@phone/@field1/@field2',
  function() {
    header("Access-Control-Allow-Origin: *");
    $name = F3::resolve('{{@PARAMS.name}}');
    $phone = F3::get('PARAMS["phone"]');
    $field1 = F3::get('PARAMS["field1"]');
    $field2 = F3::get('PARAMS["field2"]');
    $time = '';
DB::sql('INSERT INTO `waitingdb`.`seatTables` (`id`, `name`, `phone`, `field1`, `field2`, `time`) VALUES (NULL, \''. $name . '\', \'' . $phone . '\', \''. $field1 . '\', \''. $field2 . '\', \''.$time.'\');');
	}
);




F3::run();

?>
