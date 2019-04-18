<?php
  $url = 'https://pemilu2019.kpu.go.id/static/json/hhcw/ppwp.json';
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	$response = curl_exec($ch);
	curl_close($ch);
	$response = json_decode($response, true);
	$total_suara = (int)$response['chart'][21] + (int)$response['chart'][22];
	$jokowi = ($response['chart'][21] / $total_suara) * 100;
	$prabowo = ($response['chart'][22] / $total_suara) * 100;
	$progress = ($response['progress']['proses'] / $response['progress']['total']) * 100;
	echo 'Jokowi: ' . number_format($jokowi, 2) . '%<br>';
	echo 'Prabowo: ' . number_format($prabowo, 2) . '%<br>';
	echo 'Total Suara: ' . $total_suara . '<br>';
	echo 'Progress: ' . number_format($progress, 2) . '%';
?>
