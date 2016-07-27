<?php

function run_gulp(string $task = 'default')
{
    system("gulp {$task} --gulpfile /vagrant/scripts/gulp/main.js --color");
}
