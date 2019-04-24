# training-movies

*This is backend for client side development training. It is not meant for real use.*

## Instalace

1. Naklonovat si repository
1. `npm install --production` v adresáři, kde je umístěn package.json nainstaluje použité npm moduly.
1. `npm start` spustí webserver, který bude dostupný na adrese http://localhost:8080/

## Zadání práce

Vytvořte webovou aplikaci pro evidenci shlédnutých filmů a seriálů spolu s jejich hodnocením. Aplikace umožňuje filmy prohlížet, filtrovat dle jejich typu nebo části názvu, přidávat, upravovat a mazat. Filmy i seriály je možno hodnotit. U seriálů je možné hodnotit i jednotlivé díly, evidovat jejich počet a názvy jednotlivých dílů. Aplikace slouží pro jednoho uživatele.

V aplikaci je možné evidovat následující data (`[]` značí, že se jedná o více možných hodnot, `?` označuje pole, která nejsou povinná):

### Movie

    id?: string
    name: string
    type: string
    yearOfRelease?: number
    mainDirector?: string
    starring?[]:
        actorName: string
    genres?[]:
        genre: string
    description?: string
    rating?:
        dateOfWatching?: date
        seenItWhole: boolean
        score: number

Atribut `id` uživatel nevyplňuje, přiděluje ho server.

Atribut type musí mít hodnotu "movie" nebo "series". Klient by měl zároveň kontrolovat, že `yearOfRelease` spadá do rozumného časového rozsahu (server to nicméně nekontroluje, co je rozumný rozsah je tedy na Vás). Pro genre si může klient připravit výčet hodnot, nebo je nechat uživateli zadat. `Description` by měl mít uživatel možnost zadat víceřádkovým textem. Jakých hodnot nabývá `score` (zda menší je lepší či obráceně a v jakém rozsahu) je na Vašem rozhodnutí.

### Series

Seriál má stejná data jako film. Navíc ještě kolekci sezón a v ní kolekci dílů. Každý díl může mít vlastní rating.

    seasons[]:
        number: number
        episodes[]:
            episodeName?: string
            rating?:
                dateOfWatching?: date
                seenItWhole: boolean
                score: number

### UI

Aplikace by měla při spuštění zobrazit seznam filmů. Nad tímto seznamem jde filtrovat těmito způsoby:

- uživatel zadá třeba i částečný název; toto porovnání by nemělo zohledňovat velká a malá písmena
- uživatel zadá třeba jen částečný název některého z herců (starring)
- uživatel může zvolit, že chce vidět jen filmy nebo jen seriály

Seznam filmů jde zároveň i řadit podle některého z těchto sloupců

- name
- yearOfRelease
- score (v případě seriálů se zohledňuje jen score celého seriálu, ne jednotlivých dílů)

Seznam nemusí být stránkován.

## API

Backend server běží na adrese http://localhost:8080/. Vystavuje následující služby:

- `http://localhost:8080/list`  (GET - vrací jen základní údaje o dílech)
- `http://localhost:8080/record?id=`*(začátek názvu díla)* (GET - vrací všechna data daného záznamu)
- `http://localhost:8080/create` (POST s obsahem Movie nebo Series)
- `http://localhost:8080/update` (POST s obsahem Movie nebo Series)
- `http://localhost:8080/delete` (POST s objektem `{ "id": `*(id záznamu, který má být smazán)* `})`

Pokud se operace zdaří, vrací server status code **200 OK**. Pokud služba record nenanjde záznam s daným ID vrací **404 Not Found**. Pokud služby `create`, `update` či `delete` dostanou nekorektní data, vrazí server status **400 Bad request**. Pokud došlo při práci serveru k nějaké jiné chybě, vrací **500 Internal Server Error**. Chybové odpovědi navíc mohou obsahovat objekt s popisem chyby ve formátu `{ "error": "`(*popis chyby*)`" }`.

Služby `create` a `update` vrací výsledný záznam. To je důležité především u `create`, při které dojde k přidělení id.

Server si ukládá data do souboru data.json. Tento soubor lze tedy smazat nebo naopak předvyplnit. Pokud soubor neexistuje nebo má nekorektní strukturu server ho automaticky smaže a založí prázdný s několika výchozími filmy (ty je samozřejmě možné smazat).
