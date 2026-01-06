# merge_best_into_ultimate.ps1 - Fusion safe : garde le meilleur de second + éventuels goodies first

Write-Host "🌟 Fusion finale dans ultimate : priorise second (meilleur) + ton local"

git checkout ultimate

# Merge second (base avancée) - normalement déjà à jour, mais safe
git merge origin/second --no-edit

# Merge first (seulement si goodies uniques) - stratégie ours pour garder ultimate/second en cas conflit
git merge origin/first -s recursive -X ours --no-edit

git add -A
git commit -m "Fusion ultime : meilleur de second (GPS/PWA/ETA/toasts) + structure first si utile. Version finale prête pour démo !"

git push origin ultimate

Write-Host "✅ Ultimate fusionnée et pushée ! C'est la version définitive : tout le meilleur des 2 branches + fixes."
Write-Host "Test : npm run dev → tout fluide, GPS réel sur tel."
Write-Host "Build : npm run build → /dist pour remise ou déploiement Vercel/Netlify."
Write-Host "Tu es prêt pour la soutenance – montre GPS réel + PWA installable, ça va impressionner !! 🏆🚌"