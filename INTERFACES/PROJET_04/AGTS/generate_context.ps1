# generate_context.ps1 – Version améliorée pour AGTS
# Auteur : Christ (avec l'aide de Grok)
# Objectif : Générer un fichier texte complet du projet pour le partager avec une IA

$outputFile = "projet_agts_context.txt"

# Nettoyage si le fichier existe déjà
if (Test-Path $outputFile) { Remove-Item $outputFile }

# En-tête général
Add-Content -Path $outputFile -Value "CONTEXTE COMPLET PROJET AGTS - REACT/VITE/TYPESCRIPT/TAILWIND/ZUSTAND"
Add-Content -Path $outputFile -Value "Date de génération : $(Get-Date)"
Add-Content -Path $outputFile -Value "Chemin du projet   : $((Get-Location).Path)"

# Branche Git actuelle
$branch = "Aucune (pas de repo Git détecté)"
if (Test-Path ".git") {
    $branch = git rev-parse --abbrev-ref HEAD 2>$null
    if ($LASTEXITCODE -ne 0) { $branch = "Git détecté mais erreur de lecture" }
}
Add-Content -Path $outputFile -Value "Branche Git actuelle : $branch"
Add-Content -Path $outputFile -Value "=======================================================================`n"

Write-Host "Génération du contexte AGTS en cours..." -ForegroundColor Cyan

# 1. Arborescence complète du projet
Write-Host "Ajout de l'arborescence du projet..." -ForegroundColor Yellow
Add-Content -Path $outputFile -Value "ARBRESCENCE DU PROJET (tree /f /a)"
Add-Content -Path $outputFile -Value "========================================================================"
tree /f /a | Add-Content -Path $outputFile
Add-Content -Path $outputFile -Value "`n=======================================================================`n"

# 2. Fichiers importants à la racine
$rootImportantFiles = @(
    "package.json", "tsconfig.json", "vite.config.js", "tailwind.config.js",
    "postcss.config.js", "index.html", ".gitignore", "README.md",
    "vite-env.d.ts"
)

foreach ($file in $rootImportantFiles) {
    if (Test-Path $file) {
        Add-Content -Path $outputFile -Value "FICHIER RACINE : $file"
        Add-Content -Path $outputFile -Value "========================================================================"
        Get-Content -Path $file -Raw | Add-Content -Path $outputFile
        Add-Content -Path $outputFile -Value "`n=======================================================================`n"
    }
}

# 3. Contenu du dossier public (icônes, manifest, etc.)
if (Test-Path "public") {
    Add-Content -Path $outputFile -Value "DOSSIER PUBLIC (assets statiques)"
    Add-Content -Path $outputFile -Value "========================================================================"
    Get-ChildItem -Path "public" -Recurse -File | ForEach-Object {
        Add-Content -Path $outputFile -Value "FICHIER PUBLIC : $($_.FullName.Substring((Get-Location).Path.Length+1))"
        Add-Content -Path $outputFile -Value "--------------------------------------------------"
        if ($_.Extension -match '\.html|\.json|\.xml|\.txt') {
            Get-Content -Path $_.FullName -Raw | Add-Content -Path $outputFile
        } else {
            Add-Content -Path $outputFile -Value "[Fichier binaire/image – non affiché]"
        }
        Add-Content -Path $outputFile -Value ""
    }
    Add-Content -Path $outputFile -Value "`n=======================================================================`n"
}

# 4. Tous les fichiers source (src) – extensions élargies
Write-Host "Analyse du dossier src..." -ForegroundColor Yellow
$sourceExtensions = "*.ts", "*.tsx", "*.js", "*.jsx", "*.css", "*.json", "*.svg", "*.png", "*.jpg", "*.jpeg"
$files = Get-ChildItem -Path "src" -Recurse -Include $sourceExtensions -File

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring((Get-Location).Path.Length + 1)
    
    Add-Content -Path $outputFile -Value "FICHIER SRC : $relativePath"
    Add-Content -Path $outputFile -Value "========================================================================"
    
    # Pour les fichiers binaires (images/svg) on n'affiche pas le contenu
    if ($file.Extension -match '\.png|\.jpg|\.jpeg|\.ico') {
        Add-Content -Path $outputFile -Value "[Fichier image – non affiché]"
    } else {
        Get-Content -Path $file.FullName -Raw | Add-Content -Path $outputFile
    }
    
    Add-Content -Path $outputFile -Value "`n=======================================================================`n"
}

Write-Host "Terminé ! Fichier généré : $outputFile" -ForegroundColor Green
Write-Host "Tu peux maintenant copier-coller son contenu ou l'attacher directement dans ta conversation avec Grok." -ForegroundColor Green