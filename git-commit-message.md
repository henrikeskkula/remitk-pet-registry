# Git *commit* sõnumi juhend (OpenStacki põhjal)


Korralikult kirjutatud *commit*-sõnumid muudavad koodi hooldamise lihtsamaks, aitavad teistel arendajatel mõista tehtud muudatusi ja kiirendavad koodikontrolli protsessi. 
Siin on samm-sammuline juhend, kuidas kirjutada tõhus Git *commit*-sõnum.

Juhend on koostatud [OpenStack Git *commit* parimad praktikad] (https://wiki.openstack.org/wiki/GitCommitMessages#Information_in_commit_messages) põhjal.

## **Commit-sõnumi struktuur**

*Commit*-sõnum koosneb kolmest põhiosast:

1. **Lühike kokkuvõte** – esimene rida (kuni 50 tähemärki)
2. **Tühi rida** – eraldab kokkuvõtte ja detailse kirjelduse
3. **Detailne kirjeldus** – täpsem selgitus muudatuse kohta
4. **Metaandmed (vajadusel)** – viited vigadele, plaanidele, piletitele jms.


## **1. Lühike kokkuvõte (Summary Line)**

- **Piira pikkust**: kuni 50 tähemärki
- **Kirjuta käsu vormis**: alustuseks tegusõna olevikuvormis
- **Ära lisa punkti lõppu**
- **Ole selge ja konkreetne**

**Näide:**

```sh
Fix bug in user authentication flow
```

Halb näide:
- "Fixed a bug in the authentication system." (Liiga pikk, minevikuvorm)
- "Bug fix for user login issue." (Vähe informatiivne)


## **2. Tühi rida**

- Aseta **üks tühi rida** lühikokkuvõtte ja detailse kirjelduse vahele.
- See aitab Git-il ja muudel tööriistadel eristada kokkuvõtet ja sisu.


## **3. Detailne kirjeldus**

>The commit message must contain **all the information** required to **fully understand & review** the patch for correctness. Less is not more. **More is more**.


Kirjelda:
- **Miks muudatus tehti** – milline probleem vajas lahendamist
- **Kuidas see lahendati** – tehnilise lahenduse detailid
- **Mis veel oluline** – kõrvalmõjud, piirangud, testimise juhised

**Näide:**

```sh
Fix bug in user authentication flow

The login process was failing when special characters were included
in the username due to incorrect escaping in the SQL query.
This change updates the query to use parameterized inputs, 
preventing SQL injection vulnerabilities.

Steps to reproduce:
1. Attempt to log in with a username containing special characters.
2. Observe the failure prior to this fix.

Tests:
- Added unit tests for special character handling.
- Manual testing confirmed the fix.

Closes-Bug: #123456
Change-Id: Iabcdef1234567890
```


## **4. Metaandmed (vajadusel)**

Lisa metaandmeid, kui *commit* on seotud konkreetse vea, plaani või muudatusega:

- **Vigade sulgemine**:
  ```sh
  Closes-Bug: #123456
  ```

- **Blueprint (arendusplaan) rakendamine**:
  ```sh
  Implements: blueprint new-feature-api
  ```

- **Muudatuse ID (nt Gerrit töövoogudes)**:
  ```sh
  Change-Id: I1234567890abcdef
  ```


## **Näidis *commit*-sõnum**

```sh
Improve performance of data processing module

The data processing pipeline had performance issues when handling
large datasets due to inefficient looping structures. Replaced
nested loops with optimized vectorized operations using NumPy,
resulting in a 40% reduction in processing time.

Benchmark results:
- Dataset A: 60s → 36s
- Dataset B: 120s → 72s

Added unit tests to ensure data consistency remains unaffected.

Implements: blueprint data-processing-optimization
Closes-Bug: #987654
Change-Id: I4946a16d27f712ae2adf8441ce78e6c0bb0bb657
```


## Kokkuvõte

1. **Kirjelda selgelt algne probleem**  
   - Ära eelda, et ülevaataja mõistab probleemi olemust.  
   - Kirjelda selgelt probleemi põhjus, sõltumata vea raporti ajaloost.

2. **Tagada iseseisev *commit*-sõnum**  
   - Ära tugine välistele linkidele või veebiressurssidele.  
   - *Commit*-sõnum peab sisaldama kogu vajalikku teavet.

3. **Ära eelda, et kood on iseenesest mõistetav**  
   - Selgita nii probleemi kui ka lahendust, välja arvatud väiksemad veaparandused (nt kirjavead).

4. **Kirjelda muudatuse põhjuseid**  
   - Ära keskendu ainult sellele, *kuidas* kood kirjutati; selgita ka *miks* see muudatus vajalik oli.  
   - Too välja muudatuse eesmärk ja motivatsioon.

5. **Hinda *commit*-sõnumit koodi struktuuri seisukohalt enne *commit*-imist**
   - Suured *commit*’id võivad vajada jagamist väiksemateks osadeks.  

6. **Paku piisavalt teavet ülevaatajatele**  
   - Lisa piisavalt detaile, et aidata ülevaatajatel otsustada, kas nad peaksid muudatust vaatama (vabavara puhul)

7. **Oluline on esimene rida**  
   - Esimene rida kuvatakse e-kirjades, Git logides ja muudatuste vaates.  
   - Hoia see lühike (≤50 tähemärki) ja maini mõjutatud koodi osa (nt 'libvirt').

8. **Maini piiranguid ja tulevikuplaane**  
   - Too välja teadaolevad probleemid, piirangud või tulevased täiustused.  
   - See näitab, et oled arvestanud laiemat konteksti.

9. **Dokumenteeri testimisplaan selgelt**  
   - Ära eelda, et ülevaataja teab, milliseid teste on tehtud.  
   - Lisa **"Testimisplaan"** sektsioon, kus kirjeldad automatiseeritud ja käsitsi teste.

10. **Väldi *patch-set* spetsiifilisi kommentaare**  
(patch-set on koodi ülevaatuse iteratsioonide seeria)
    - Ära lisa kommentaare nagu "Patch set 2: rebased" *commit*-sõnumisse.  
    - Kui muudatused *patch-set*’ide vahel mõjutavad commit’i eesmärki, siis lisa see info.

## **Levinud vead, mida vältida**

1. **Liiga üldised sõnumid:** 
   - Halb: `Update files`
   - Hea: `Refactor logging mechanism for error handling`

2. **Puudub detailne kirjeldus:** 
   - Lisa alati põhjus, miks muudatus on vajalik.

3. **Unustatakse tühi rida:** 
   - Git’i tööriistad võivad seda valesti kuvada.


Järgides neid juhiseid, tagad arusaadavad ja professionaalsed *commit*-sõnumid, mis muudavad koodibaasi hoolduse ja ülevaatuse lihtsamaks kõigile arendajatele.
