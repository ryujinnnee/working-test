<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class DatabaseController extends Controller
{
    public function backup()
    {
        try {
            $dbName = env('DB_DATABASE');
            $dbUser = env('DB_USERNAME');
            $dbPass = env('DB_PASSWORD');
            $mysqldumpPath = "C:\\Users\\user\\AppData\\Local\\Programs\\PhpWebStudy-Data\\app\\mysql-8.3.0\\mysql-8.3.0-winx64\\bin\\mysqldump.exe";
            $filePath = storage_path("app/backup-" . date('Y-m-d_H-i-s') . ".sql");

            $command = "cmd /c \"{$mysqldumpPath} -u {$dbUser} -p{$dbPass} {$dbName} > \"{$filePath}\"\"";
            $process = Process::fromShellCommandline($command);
            $process->run();

            if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }

            return response()->json(['message' => 'Backup success', 'file' => $filePath]);
        } catch (ProcessFailedException $e) {
            return response()->json(['error' => 'Backup failed', 'details' => $e->getMessage()], 500);
        }
    }

    public function restore(Request $request)
    {
        try {
            $request->validate([
                'sql_file' => 'required|file|mimes:sql',
            ]);

            $file = $request->file('sql_file')->storeAs('restores', 'restore.sql');
            $filePath = storage_path("app/" . $file);

            $dbName = env('DB_DATABASE');
            $dbUser = env('DB_USERNAME');
            $dbPass = env('DB_PASSWORD');

            $command = "mysql -u {$dbUser} -p{$dbPass} {$dbName} < {$filePath}";

            $process = Process::fromShellCommandline($command);
            $process->run();

            if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }

            return response()->json(['message' => 'Restore success']);
        } catch (ProcessFailedException $e) {
            return response()->json(['error' => 'Restore failed', 'details' => $e->getMessage()], 500);
        }
    }
}
