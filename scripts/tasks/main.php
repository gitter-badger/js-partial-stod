<?php

require __DIR__ . '/./tasks/gulp.php';

if (count($argv) > 1) {
    $mainTask = $argv[1];

    switch ($mainTask) {
        case 'test':
            run_gulp('tasks/test-src');
            break;

        default:
            run_gulp($mainTask);
            break;
    }

} else {
    run_gulp();
}
