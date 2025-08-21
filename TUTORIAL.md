# Codebase

Pentru inceput, aici este repo-ul.

https://github.com/Shumy52/ai-institute-site

Acolo aveti tot ce va trebuie pentru a va da seama de structura actuala a website-ului. Trageti un ochi prin commit-uri si prin README.md ca sa aveti un punct de plecare.

Recomand sa faceti fork la repo-ul meu, sa va adaugati colaboratori pe un repo secundar, sa faceti acolo ce stiti mai bine si apoi sa dati pull request. But the choice is yours.

Nu am apucat sa fac nimic CI/CD momentan, doar dau export si pun pe server cu un set de scripturi de rsync.

# Hosting

Pentru moment, paginile web sunt hostate STATIC. In alte cuvinte, toate fisierele HTML, TXT (exista fisiere txt pe langa cele de HTTP, tin de elementele de React, nu le stergeti), JS si restul sunt tinute intr-un folder, iar NGINX le serveste pe HTTPS.

> Hosting-ul nu este batut in cuie. Daca este nevoie de ceva si motivul este bun, se rezolva. Sunt multe ce se pot imbunatati, dar s-a considerat "good enough". M-ati ajuta enorm daca ati gasi motive sa trecem la "serve" in loc sa ramanem la static.

Faptul ca sunt statice schimba modul in care va puteti juca cu website-ul:

- Nu poate avea backend, paginile sunt complet statice
- Navigarea este ciudata... Client-side navigation si NGINX nu se impaca prea bine.
- And others...

# Testing

Din moment ce nu va voi da acces direct la productie, in ciuda faptului ca v-am cerut cheile de SSH, va trebui sa testati local ce lucrati.

Atentie!

```
npm run dev
```

Aceasta instructiune nu va ajuta dacă planuiti sa scrieti cod pentru modul de hosting actual.
Cu instructiunea asta sunteti in "serve", nu in static, deci s-ar putea sa nu mearga la fel pe productie.

Modul in care puteti testa pentru a vedea exact ce va avea loc pe productie:

- Instalati extensia "Live Server" pe VS Code (sau alternative)
- Rulati:

```bash
npm run export
```

- Deschideti inca o instanta de VSCode pe folder-ul "out" imediat ce se termina instructiunea de mai sus
- Apasati pe "Go Live" din coltul dreapta jos al VSCode.
- Ar trebui sa vedeti site-ul. Daca vedeti o structura de fisiere sau orice altceva decat pagina de start al site-ului, verificati unde exact ati deschis acea noua instanta de VSCode, root-ul trebuie sa fie in /out!

# How do git

Mai jos am pus un mesaj trimis unui tovaras de al meu, spunandu-i cum ar trebui sa lucreze cu git sa fie *frumooos*. Daca vreti sa faceti pull request pe repo-ul asta la o data ulterioara, va rog cititi.

" O să presupun că scrii mesajele pe VS code. Dacă nu e cazul, poți mereu căuta pe net cum se scrie în cazul tău, fie terminal fie Jetbrains etc.

Prima linie trebuie să fie foarte scurtă și succintă. Ea va apărea pe git lângă fiecare din fișiere pe github.com. Ca să fie elegantă, trebuie să nu fie cutoff.

De regulă începi cu un cuvânt cheie, ex.: add/feat (pentru ceva complet nou), refact (de la refactor, ai rescris o secțiune de cod pentru eficiență sau simplitate, whatever the case, funcționalitatea în sine nu a fost afectată, programul nu face nimic nou și nimic nu s-a pierdut), fix (self explanatory), chore (ceva banal, cum ar fi un update în ceva dependențe sau niște comentarii puțin importante, pentru ceva oficial/legat de licență maybe), docs (comentarii în cantitate sau de importanță serioasă, README, changelog, altceva ce ține de documentație)

În continuare, după cuvântul cheie, scrii în 2-7 cuvinte ce s-a făcut, cu verbe de forma: change, add, remove, update, clean, improve etc. (nu știu cum se zice oficial).
O să-ți atașez cum am făcut eu. (see repo)

Next, începând de pe a treia linie în VScode (considerând că tu ai mers pe tab-ul de git în VScode și ai dat commit cu commit message-ul de acolo sus gol, în acel caz ți se va deschide un fișier cu titlul COMMITMSG sau ceva de genul ăsta, dacă nu te descurci îmi zici)... Revenind, începând de pe a treia linie scrii mai în detaliu ce ai făcut. Nu enunța doar ce ai schimbat și unde, asta se poate vedea oricum în diff-urile dintre commit-uri, concentrează-te pe motive și ce nu poate să reiasă din cod în sine. Extinde subiectul PE MODIFICĂRI, nu spune doar ce ai schimbat.

Apoi, granularitate. Într-un commit ar trebui să fie o singură acțiune. Ai reparat ceva, commit, ai adăugat ceva, commit, ai pus foarte multe comentarii peste tot, commit.

Dacă ajungi să pui mai multe cuvinte cheie sau ai un mesaj de genul: "add navbar, fix footer, add docs", you're doing it wrong.

La VScode poți selecta ce merge în commit. Chiar dacă tu ai schimbat jumate de proiect, tu poți selecta și împărți fiecare parte în ce commit merge. De la butoanele de plus. Bonus points dacă te prinzi cum să separi modificările din același fișier, să meargă în commit-uri diferite.

In the end, fă o tură prin proiectele tale de pe git, mergi la commit-uri și imaginează-ți că vrei să dai fork. Să-ți fie ușor și plăcut să te prinzi ce vrei să ai în fork-ul tău și ce nu. Să nu trebuiască să descifrezi cod ca să îți dai seama de ce feature-uri ai incluse până în acel punct și ce nu. "

# End

The end. Take everything with a grain of salt, I had a week to create the core of the website, having no experience or knowledge whatsoever with web development beforehand.

I'm a student in the 3rd year, and if you're reading this, most like so are you, so feel free to criticize, change, debate. I tried my best and hopefully you'll do the same.
