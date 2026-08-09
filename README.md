
### Verify return code: `18 (self-signed certificate)`
````
read R BLOCK
Post-Handshake New Session Ticket arrived:
SSL-Session:
Protocol  : TLSv1.3
Cipher    : TLS_AES_256_GCM_SHA384
Session-ID: A3D3DE1D3167A209B2AAEEC41229450263357A8AD0323432453B58A1753D6992
Session-ID-ctx:
Resumption PSK: 0F1FF2DB80E455F5FF640DD9D0329783B2875311F9C32305039DF3A9AEDD9972BC6084259AFB57A08644C58B9C64D784
PSK identity: None
PSK identity hint: None
SRP username: None
TLS session ticket lifetime hint: 7200 (seconds)
TLS session ticket:
0000 - af af d6 58 09 8b a3 61-69 6f 6f 58 22 74 47 54   ...X...aiooX"tGT
0010 - 79 c9 c5 d8 a4 a7 4e b8-2b 34 cc e1 44 60 99 a3   y.....N.+4..D`..
0020 - ee fa dd 33 81 64 2a d6-a1 a6 15 53 97 da b9 14   ...3.d*....S....
0030 - 3e 0b 5a f3 30 d3 f7 87-dc 8a 69 29 ca 42 e7 75   >.Z.0.....i).B.u
0040 - 03 e4 37 7c d8 8d b2 7b-5c f9 1d 63 da 00 96 65   ..7|...{\..c...e
0050 - f4 22 15 fe 20 34 7e c3-32 c9 4e d9 b1 91 3c a2   .".. 4~.2.N...<.
0060 - 13 0c f2 02 d3 c7 f7 95-1d 39 5c 41 b0 ec e9 ed   .........9\A....
0070 - e7 eb 9c 7c e1 16 e3 0c-16 e6 e9 9d 62 ee 16 a3   ...|........b...
0080 - 37 38 47 0a bd 65 b3 16-e0 82 fc e5 fd 41 a7 3c   78G..e.......A.<
0090 - 50 02 85 01 13 6e cb 52-3b 89 96 37 03 84 fa 78   P....n.R;..7...x
00a0 - d7 de 42 07 9e 82 d7 8d-ba d8 7e 7b e4 a8 2a 84   ..B.......~{..*.
00b0 - 69 56 9c 79 5b c1 da 50-56 bf fe 49 fe c5 a2 8a   iV.y[..PV..I....
00c0 - 76 d8 fc 7f 3f c4 77 01-35 c6 fd f4 e8 96 2c 43   v...?.w.5.....,C
00d0 - 19 a5 06 e5 3b 18 70 6e-98 e7 58 43 c5 b5 a9 12   ....;.pn..XC....
00e0 - 24 3c 94 38 57 90 7d 4a-aa bb 5b c8 9e a7 0b 47   $<.8W.}J..[....G

    Start Time: 1786298222
    Timeout   : 7200 (sec)
    Verify return code: 18 (self-signed certificate)
    Extended master secret: no
    Max Early Data: 0````
````
---
Пояснення: помилка self-signed certificate свідчить про те, що сертифікат самопідписаний (підписаний за допомогою приватного ключа, згенерованого на сервері). Клієнт не може підтвердити через сертифіковані центри про належність сертифіката до надавача ресурсу.