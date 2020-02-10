# JS CSV meta transform

Script em Javascript para importar um arquivo csv, no formato A, manipular para
o formato B e gravar o arquivo atualizado no disco.

Formato A:

| idx | id_data   | meta                 |
| --- | --------- | -------------------- |
| 1   | 000_00001 | valueA,valueB,valueD |
| 2   | 000_00002 | valueB,valueC        |
| 3   | 000_00003 | valueD               |
| 4   | 000_00004 | valueA,valueD        |

Formato B:
|idx | id_data | valueA | valueB | valueC | valueD |
|----|---------|--------|--------|--------|--------|
|1 | 000_00001 | 1 | 1 | 0 | 1|
|2 | 000_00002 | 0 | 1 | 1 | 0|
|3 | 000_00003 | 0 | 0 | 0 | 1|
|4 | 000_00004 | 1 | 0 | 0 | 1|
