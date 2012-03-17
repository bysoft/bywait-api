<?php

/*
 __
|__)\_/
|__) |

.-. .-. .-. .-. . . . .-. .-. .-.   .-. . . .-.
`-. | | |-   |  | | | |-| |(  |-     |  |\| |
`-' `-' '    '  `.'.' ` ' ' ' `-'   `-' ' ` `-'

*/


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

F3::set('CACHE',FALSE);

F3::route('GET /min',
  function() {
    Web::minify($_GET['base'],explode(',',$_GET['files']));
  },
  3600
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
		echo Template::serve('index.html');
	}
);
$main->route('GET /works.html',
  function(){
       echo Template::serve('header.html');
	 echo Template::serve('works.html');
  }

  );
$main->route('GET /video.html',
	function() {
	    echo Template::serve('header.html');
		echo Template::serve('video.html');
	}
);

$main->route('GET /music.html',
	function() {
	    echo Template::serve('header.html');
		echo Template::serve('music.html');
	}
);

F3::route('GET /v1/bbc/radio1/mix','bbcdata->essentialMix');
F3::route('GET /v1/bbc/radio1/playing','bbcdata->nowPlaying');
F3::route('GET /v1/bbc/radio1/photos','bbcdata->latestPhotos');
F3::route('GET /v1/bbc/radio1/getListings','bbcdata->getListings');

class bbcdata {
	function essentialMix() {
	    $essentialMix = 'http://www.bbc.co.uk/programmes/b006wkfp.json';
	    $content = Web::http('GET ' . $essentialMix);
		header('Content-type: application/json');
	    echo $content;
	}
	function nowPlaying(){
    	$nowPlaying = 'http://www.bbc.co.uk/radio1/nowplaying/latest.json';
	    $content = Web::http('GET ' . $nowPlaying);
		header('Content-type: application/json');
	    echo $content;
	}
	function latestPhotos(){
	    $latestPhotos = 'http://www.bbc.co.uk/radio1/photos/latest.json';
	    $content = Web::http('GET ' . $latestPhotos);
		header('Content-type: application/json');
	    echo $content;
  }
  function getListings(){
    $content = Web::http('GET http://www.bbc.co.uk/programmes/b01cpqly');
    echo $content;
  }
}



$main->route('GET /v1/vimeo/channels',
	function() {
		$contents=Web::http('GET http://vimeo.com/channels');
		echo $contents;
		echo '<script src=//google.com/jsapi/></script>';
		echo "<script>google.load('jquery','1.7.1')</script>";
		echo "<script>var feat = $('#featured')</script>";
		echo "<script>$('body').empty().append(feat)</script>";
		echo "<style>#featured{width:300px}</style>";
	}
);




$main->route('GET /photos/popular',
	function()
	{
		header('Content-type: application/json');
		$contents=Web::http('GET https://api.500px.com/v1/photos?feature=popular&page=1&total_items=4&consumer_key=R1r996a9UrWcY7zIMgbQ54VC9UmYWyAaOOAkBJC9');
		echo $contents;
	}
);




$main->route('GET /v1/user/@rand',
  function() {
  		$rand = F3::get('PARAMS["rand"]');

        DB::sql("SELECT `site` FROM `hashReg` WHERE `key` = '$rand'");

		echo Template::serve('abc.htm');
	}
);

$main->route('GET /v1/waiting',
  function() {


# if (!F3::get('SESSION.user')) F3::set('content','security.html');

        $name = F3::get('PARAMS["name"]');
        header('Cache-Control: no-cache, must-revalidate');
        header('Expires: Mon, 26 Jul 2013 05:00:00 GMT');
        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        $personData = DB::sql('SELECT name, phone,field1,field2,field3 FROM seatTables');
        echo json_encode($personData);
	}
);

$main->route('GET /v1',
  function() {
        $name = F3::get('PARAMS["name"]');
        header('Cache-Control: no-cache, must-revalidate');
        header('Expires: Mon, 26 Jul 2013 05:00:00 GMT');
        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        $personData = DB::sql('SELECT name, phone,field1,field2,field3 FROM seatTables');
        echo json_encode($personData);
	}
);

$main->route('GET /v1/blip/@query',
  function() {
  		$query = F3::get('PARAMS["query"]');
        $picData=Web::http('GET http://blip.tv/search/?q='.$query.'&skin=json');
        echo $picData;
        echo $query;
	}
);




$main->route('GET /v1/blip/pagelen/@pagelen',
  function() {
  		$pagelen = F3::get('PARAMS["pagelen"]');
        // $picData=Web::http('GET http://blip.tv/posts/?pagelen='.$pagelen.'&file_type=mp3,m4a,mov,mpg,mp4,m4v&skin=json&no_wrap=1');
        $picData=Web::http('GET http://blip.tv/posts/?pagelen='.$pagelen.'&&skin=json&no_wrap=1');
		// $picData=Web::http('GET http://byapp.co/xml/bliptv-daily-changes-2012-03-09.json');
        // bliptv-daily-changes-2012-03-09.json
        header('Cache-Control: no-cache, must-revalidate');
        header('Expires: Mon, 26 Jul 2013 05:00:00 GMT');
        header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        echo $picData;
	}
);

$main->route('GET /blip/pagelen/@pagelen',
  function() {
  		$pagelen = F3::get('PARAMS["pagelen"]');
        $picData=Web::http('GET http://byapp.co/v1/blip/pagelen/'.$pagelen);
        $picData_a = json_decode($picData,true);
        $picData_o = json_decode($picData);

for ($i = 1; $i <= 10; $i++) {

		echo '<div style="border:1px solid #ff0">';
	    echo $picData_a[$i]['media']['url'] . '<br />';
	    echo $picData_a[$i]['description'] . '<br />';
		echo $picData_a[$i]['title'] . '<br />';	//media_thumbnail_src
		echo '<img src='.$picData_a[$i]['thumbnailUrl'] . ' /><br />';	//media_thumbnail_src
		echo '</div>';
}

        // echo $picData_o->showName;
        // echo $picData;
        // var_dump($picData);



	}
);


$main->route('GET /spotify/query/@query1/@query2',
	function(){
		// $contents = Web::http('GET http://waitwith.us/v1/waiting');
		// echo $contents;
		$query1 = F3::get('PARAMS["query1"]');
		$query2 = F3::get('PARAMS["query2"]');

		echo Web::http(
			'GET http://ws.spotify.com/search/1/track.json',
			http_build_query(
				array(
					'q'=> $query1 . '+' . $query2
				)
			)
		);
	}
);
$main->route('GET /spotify/query/@query1',
	function(){
		// $contents = Web::http('GET http://waitwith.us/v1/waiting');
		// echo $contents;
		$query1 = F3::get('PARAMS["query1"]');
		$query2 = F3::get('PARAMS["query2"]');

		echo Web::http(
			'GET http://ws.spotify.com/search/1/track.json',
			http_build_query(
				array(
					'q'=> $query1 . '+' . $query2
				)
			)
		);
	}
);


$main->route('POST /v1/waiting/@name/@phone/@field1/@field2/@field3',
  function() {
//    if (!F3::get('SESSION.user')) F3::set('content','security.html');
    header("Access-Control-Allow-Origin: *");
    $name = F3::resolve('{{@PARAMS.name}}');
    $phone = F3::get('PARAMS["phone"]');
    $field1 = F3::get('PARAMS["field1"]');
    $field2 = F3::get('PARAMS["field2"]');
    $field3 = F3::get('PARAMS["field3"]');
    $time = '';
DB::sql('INSERT INTO `waitingdb`.`seatTables` (`id`, `name`, `phone`, `field1`, `field2`, `field3`, `time`) VALUES (NULL, \''. $name . '\', \'' . $phone . '\', \''. $field1 . '\', \''. $field2 . '\', \''. $field3 . '\', \''.$time.'\');');
	}
);




F3::run();

?>
