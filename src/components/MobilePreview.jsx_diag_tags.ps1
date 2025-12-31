
$filename = "MobilePreview.jsx"

$checkTags = @("div", "span", "p", "h1", "h2", "h3", "button", "a", "svg")

try {
    $content = [System.IO.File]::ReadAllText((Resolve-Path $filename).Path)
    
    foreach ($tag in $checkTags) {
        $openCount = ([regex]::Matches($content, "<$tag(\s+|>)")).Count
        $closeCount = ([regex]::Matches($content, "</$tag>")).Count
        $balance = $openCount - $closeCount
        Write-Output ($tag + " balance: " + $balance + " (Open: " + $openCount + ", Close: " + $closeCount + ")")
    }
    
    Write-Output "Note: This count doesn't account for self-closing tags like <div /> if any."
} catch {
    Write-Output ("Caught error: " + $_.Exception.Message)
}
