
$filename = "MobilePreview.jsx"
$bc = 0
$pc = 0
$ln = 0

try {
    $lines = [System.IO.File]::ReadLines((Resolve-Path $filename).Path)
    foreach ($line in $lines) {
        $ln++
        $chars = $line.ToCharArray()
        foreach ($c in $chars) {
            if ($c -eq '{') { $bc++ }
            if ($c -eq '}') { $bc-- }
            if ($c -eq '(') { $pc++ }
            if ($c -eq ')') { $pc-- }
        }
        
        if ($ln % 2000 -eq 0) {
            Write-Output ("Line " + $ln + ": Braces=" + $bc + ", Parens=" + $pc)
        }

        if ($bc -lt 0 -or $pc -lt 0) {
            Write-Output ("ERROR: Negative count at line " + $ln)
            Write-Output ("Braces=" + $bc + ", Parens=" + $pc)
            Write-Output ("Line content: " + $line)
            exit
        }
    }
    Write-Output ("FINAL: Line " + $ln + ": Braces=" + $bc + ", Parens=" + $pc)
} catch {
    Write-Output ("Caught error: " + $_.Exception.Message)
}
