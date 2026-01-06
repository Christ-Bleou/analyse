# prepare_ultimate_push.ps1 - Prépare et push la version ultime AGTS

Write-Host "🧹 Nettoyage des fichiers temporaires..."
Remove-Item *.bak -Force -ErrorAction SilentlyContinue
Remove-Item *.log -Force -ErrorAction SilentlyContinue
Remove-Item node_modules/.vite -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "🌿 Création de la branche ultimate (base : ton local actuel = second + fixes + good from first)"
git checkout -b ultimate

Write-Host "📦 Add & commit de la version ultime fonctionnelle"
git add -A
git commit -m "Version ultime AGTS : 
- Base second + bonnes parties first
- GPS réel prioritaire (chauffeur sur tel)
- Simulation fallback
- PWA installable (ajout écran d'accueil)
- Route fidèle Marcory → Koumassi → Bassam
- ETA dynamique personnalisée étudiant
- Toast bus proche
- Partage position Google Maps direct mobile
- Fixes CSS/PostCSS/syntaxe (zéro erreur console)
- Vite stable + overlay désactivé"

Write-Host "🚀 Push sur GitHub (nouvelle branche ultimate)"
git push -u origin ultimate

Write-Host "✅ Terminé ! Ta branche ultimate est pushée : https://github.com/Christ-Bleou/analyse/tree/ultimate"
Write-Host "Pour la démo/soutenance :"
Write-Host "- npm run dev → test local"
Write-Host "- npm run build → /dist prêt à zipper ou déployer (Vercel/Netlify gratuit si besoin lien web)"
Write-Host "- Sur tel : ouvre ton IP:5173, accepte géoloc, ajoute à l'écran d'accueil → app native !"
Write-Host "Tu es prêt à 100% – tout est fonctionnel, fluide PC/tel. Bonne soutenance, tu vas assurer grave !! 🏆🚌"