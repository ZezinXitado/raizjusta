# Relatório de Extração — Raiz Justa

- URL do projeto: https://app.base44.com/apps/6aa2e98f7c1eba657fbc135d/editor/workspace/code
- Data/hora da extração (UTC): 2026-10-15T23:55:20.675Z
- Relatório gerado: 2026-10-15T20:55:44
- Método: leitura do modelo Monaco (`getValue()`) de cada arquivo aberto no editor, via Claude in Chrome
- Pastas: 12
- Arquivos identificados na origem: 126
- Arquivos copiados: 126
- Arquivos validados (gravação byte a byte + JSON): 126
- Arquivos não extraídos: nenhum
- Arquivos extras locais: nenhum
- Arquivos com possíveis problemas: nenhum

## Integridade

Cada arquivo foi relido do disco e comparado byte a byte com o conteúdo extraído; SHA-256 de cada arquivo em `manifest.json`. Nenhum conteúdo vazio ou duplicado (verificação contra leitura defasada do editor).

## Arquivos

| Caminho | Bytes | SHA-256 | Status |
|---|---|---|---|
| `base44/entities/Order.jsonc` | 1498 | `06427416d2c29a3ba9d2a092e94deeb39bf1c849e67ad61dfcf7cd491ca2055c` | ok |
| `base44/entities/User.jsonc` | 251 | `4de38108e89f3bb0c1c7411eabdd47f8899238f1580428a167de47b10c5b3a31` | ok |
| `base44/config.jsonc` | 182 | `f8ead6f475eaadde481ab15e0e16417e6aedfe071116bb9961139c12124e1c5e` | ok |
| `src/api/base44Client.js` | 267 | `ac90e3b11d391f5ed5d365053acd2d2d30f1f43c06f81d9cfd235c15548a88d9` | ok |
| `src/components/raizinho/actions.js` | 12274 | `fa2a83e17dd11514d392c9ae6f8dc74ef20e551d22c88553bcc9d724546df6fd` | ok |
| `src/components/raizinho/engine.js` | 12621 | `65835bd16f7fdfa94ccb49ef63371a6c19d24424dc6381ea6a8ee5a36f2a4b57` | ok |
| `src/components/raizinho/expressions.js` | 1549 | `7abd75537e570cd455b4fd1a31e2b474a4efcfcf82cb85d57422264b6a762270` | ok |
| `src/components/raizinho/model.js` | 14229 | `a04081d6b3ce86be5c2d74f4f2affead11bf8f0020f8355d9340467550f35466` | ok |
| `src/components/raizinho/modes.js` | 1818 | `58945bbea3ad1a75654c8b612759a95160f1a82d26be2ea43fe0220ff4411b8f` | ok |
| `src/components/raizinho/particles.js` | 2431 | `3b00eda1b1932a0f85c83fbb8c53516036b942f170d419395533a5a0d367d95c` | ok |
| `src/components/raizinho/SpeechBubble.jsx` | 542 | `16d0f186d7024c6b7007d5e51ba92155dd644ee7a06e65f5e585e0631144b10d` | ok |
| `src/components/ui/accordion.jsx` | 1615 | `b47533b3783b8149550b8481e4ae93d54bdcbc51d434793c176b0aec5558ee1c` | ok |
| `src/components/ui/alert-dialog.jsx` | 3461 | `a20098cdc2eb2b5915575d3f0fb7a3e8e6c1035c7eef77144f3fc389e0fdbda0` | ok |
| `src/components/ui/alert.jsx` | 1335 | `c5baf27fb6a4bf130236fa0f336c21084fee192e8215bb6b20c87436c27f3b38` | ok |
| `src/components/ui/aspect-ratio.jsx` | 140 | `08b0aa0b05efc573c7d63363c03e83d4b101bfeb54140764e96ddea30659cfcc` | ok |
| `src/components/ui/avatar.jsx` | 1043 | `703fb6852952bd039b68dc494c004eee1d835fa12647b851722ab9b6b3058b32` | ok |
| `src/components/ui/badge.jsx` | 990 | `380dcda78ff8fdd80c82b89cb7dd38ffd84c355735fc8f16300ff647e15988aa` | ok |
| `src/components/ui/breadcrumb.jsx` | 2271 | `4c0972765dc0212c5101446cb931db44b7db68a21ef9d7bc8a75c46f9bb96e42` | ok |
| `src/components/ui/button.jsx` | 1679 | `6c28699c64ff8c36ec5a2baf835d6bfa141cedeaf472b97d64671dac6cf7cbf8` | ok |
| `src/components/ui/calendar.jsx` | 2851 | `06e0c81497bda70ac24855b54fddd385557cbc3be8d8066a345bedbec551b3ee` | ok |
| `src/components/ui/card.jsx` | 1440 | `8ab6f42e722e9c51752ce2f14aabb2696bddc0b6818041fb8f313f670955c2c4` | ok |
| `src/components/ui/carousel.jsx` | 4821 | `55eb9456609f96f5c28c1fa35fe79554fc0ffab12883e3aceb041ff10e347e83` | ok |
| `src/components/ui/chart.jsx` | 8639 | `c4684b470cae53b857a08e5fe006d4406450a442a103858beb179ec810aba2b3` | ok |
| `src/components/ui/checkbox.jsx` | 880 | `b0260cb7767493d8273f5def1b7d32e844d068db5f5760258d333ae6ad88f0d8` | ok |
| `src/components/ui/collapsible.jsx` | 329 | `f4cdd104de29928bfcd40b865c7d08eed9157a537fbb8b5e6d0921f02b63cc04` | ok |
| `src/components/ui/command.jsx` | 3897 | `e7cea37aff49e211ffea1bf3ed67add6ce1ab29862e902aff739fcd11014f06f` | ok |
| `src/components/ui/context-menu.jsx` | 5995 | `5fe320cad9ee1833e9528f86e340f83f419f77790549f4cff083fad329e8dc4c` | ok |
| `src/components/ui/dialog.jsx` | 3228 | `50a7cc4ae5ce0f2527662ed9742d35b8c4933d1629a2740b26890793aee00742` | ok |
| `src/components/ui/drawer.jsx` | 2359 | `3d2dce97d3f6bc5dfa887e87c6688228298526bfdc29a28f2edbd6c1dc2eb47a` | ok |
| `src/components/ui/dropdown-menu.jsx` | 6157 | `d36cd67e71781bbb03059b057b6f686445477a4275120359178729574398c465` | ok |
| `src/components/ui/form.jsx` | 3141 | `d899b071230c321acdb2996cbe02d84a46dd9825f81af1015f7e54c6b9ee211c` | ok |
| `src/components/ui/hover-card.jsx` | 1070 | `3b49e533ad60995767a3419351642037438e8f27b62132115fc71115cf1fd0ad` | ok |
| `src/components/ui/image-helpers.js` | 3168 | `2bf8f14c37c7c8165afe4562a1fb445866f8ab21b2baf55af34961d68b170d42` | ok |
| `src/components/ui/image.jsx` | 3980 | `28f925694fedbec102d3333b6ec0e4a571439fff5e29ccd3da050aec21512dd5` | ok |
| `src/components/ui/input-otp.jsx` | 1811 | `78a437a82203c1d9d22d47db830bdc67d49d6473c5c28ad77634eeb8c399a649` | ok |
| `src/components/ui/input.jsx` | 690 | `4455aea152904f128df0ecd82047bbceb23e06ffcc9ccc7cbb3bcc87df5bcc4f` | ok |
| `src/components/ui/label.jsx` | 525 | `37c6425d2a5c798ade4e60f89f86054d703433a8977e12d796de2b5bb4e3d0b7` | ok |
| `src/components/ui/menubar.jsx` | 6790 | `5411f1b8221d9a34fc9b58f830642cfa3a33c776d0072014690e2f024515391d` | ok |
| `src/components/ui/navigation-menu.jsx` | 4217 | `a1f789747cb750329a33ee04c54209b044239a15ba200fb9d7da1f2ce6b73403` | ok |
| `src/components/ui/pagination.jsx` | 2322 | `1d519fc3ba1c8c6cf7f2d30c98739ecba2fa7af35cbc024d6793785e7a6d65c8` | ok |
| `src/components/ui/popover.jsx` | 1166 | `199cc7b3d810013867ae91305f0966b8a66526a1c13d10248c38ee1797d169db` | ok |
| `src/components/ui/progress.jsx` | 667 | `1ad2808d51c365f04f23a4e985b03274dcc30735d74db68e1f78332a6533859c` | ok |
| `src/components/ui/radio-group.jsx` | 1135 | `10ced1e6932e4fe53d6c18201f50b8bb4b334b4372f01ce5f0993aa2a6bb9110` | ok |
| `src/components/ui/resizable.jsx` | 1570 | `4e74fb31b8321012570554dc8c55a58aacf1adcced2fdc43085c67ff96ce9773` | ok |
| `src/components/ui/responsive-image.jsx` | 2209 | `2ff9c109d44838ffd9e590a2725d018d1c27fc99a84af5a8cde2f2b2d5f9812b` | ok |
| `src/components/ui/scroll-area.jsx` | 1362 | `3de4bed34be51a940243b0fbf8c6d9324ecb416a91a919d65ca18d15a7ba32a1` | ok |
| `src/components/ui/select.jsx` | 4677 | `15c7a0e4c45b655ffa8d3f3be8bdaab727a19fd6baa95b34056bf02c7254243e` | ok |
| `src/components/ui/separator.jsx` | 600 | `2c82247abd573d0f4a93eb259166e3b778365b58c0d18921b4739d5ba4b29e7e` | ok |
| `src/components/ui/sheet.jsx` | 3549 | `33f27d1b55925dbc354d0a61b0cbc6f977352da13f4df519f06e5b5bd9ed2d5c` | ok |
| `src/components/ui/sidebar.jsx` | 20643 | `828bec5ac1ec715fe50deebae08a7da23f01e9b0dcb221b110e37de63eb22d3c` | ok |
| `src/components/ui/skeleton.jsx` | 227 | `c5f32316d9f8feeba529bac6321766424067185afee5f29a15bb18145adaf1bc` | ok |
| `src/components/ui/slider.jsx` | 914 | `1761bfaa0a06480b76b31511e4a5c24903b407732e027fc11ad615dd3d93a562` | ok |
| `src/components/ui/sonner.jsx` | 799 | `f1309f953467d583202225d08414161fc3183758ac38c997249eb63686a27ba8` | ok |
| `src/components/ui/switch.jsx` | 1025 | `880e95637cc1d90ef4476f79114afd2fa7b5f6e5da1f49a70e0efc1f84aa0c8a` | ok |
| `src/components/ui/table.jsx` | 2231 | `301509bb8337184f1b299cb15b8d4f8ec8f0d3bbc17a2ffdf33ff58f7eaa444e` | ok |
| `src/components/ui/tabs.jsx` | 1529 | `57591bdfb3fa931b06edcf4168b6881a79785c674ad0618003d12cd656072350` | ok |
| `src/components/ui/textarea.jsx` | 587 | `b64a8fabf495dd59dbfd23914334ffbdfa695f506a133370603a49eca1243f62` | ok |
| `src/components/ui/toast.jsx` | 3915 | `cf9d4869024d879c2e0c4122f74dd0d7cfc834c7377634a14e1bfc47db1d15e0` | ok |
| `src/components/ui/toaster.jsx` | 785 | `fc1bce32d9a45f5be28c67b486962b90eed76742f3c0995f5fb908ffc6bde3cd` | ok |
| `src/components/ui/toggle-group.jsx` | 1284 | `1c7566b9f2aa00f0afdf161527be90588a11386158dca55425ea0d8c0e3883e4` | ok |
| `src/components/ui/toggle.jsx` | 1310 | `e8fe6de52ef73d6fa868229ae7a21e681fb3088975847d6ee65a8387731c1c79` | ok |
| `src/components/ui/tooltip.jsx` | 1091 | `73e47a5dde6c55aca2e32e429ba95d8746ce2cca02cc718613f337b5bc9f5f19` | ok |
| `src/components/ui/use-responsive-image.jsx` | 1469 | `2bf5573b4688bea5f3edf76c68889737c8b8e0163b5fb4c3b4ab5da5715e25b9` | ok |
| `src/components/ui/use-toast.jsx` | 3379 | `40f2839736597a3f7d54e4359a375c5991ce58eb341d8abb944874ac0dce9bbc` | ok |
| `src/components/AuthLayout.jsx` | 955 | `27191e5279ab7a6d30609f7954c64edf586ce11817ca50ca63ed03bd432629ce` | ok |
| `src/components/CategoryPill.jsx` | 1012 | `f0637283fb6bda79557a44bbe17bc726d0cf65d58e62d3f5ded520cb30c1a1ff` | ok |
| `src/components/GoogleIcon.jsx` | 833 | `4d5d7b5c6a368f8246fe088eaa158b2cd0872bfafa8e5c495ec39ebb697c4f6b` | ok |
| `src/components/ImpactCounter.jsx` | 1116 | `36a9eb8e621d65341edf713bb7847c8b8bf16d8488660c7f42ac209e44132b44` | ok |
| `src/components/Layout.jsx` | 1623 | `b1142abbf5813b24da9153a61c3f23c2435e00e88977228e3149625d624b82c0` | ok |
| `src/components/Logo.jsx` | 1736 | `9c3392e8c5bf157cfceef87d36ba4f12dbc309c487f40557b54416ed6f7fdbde` | ok |
| `src/components/MascotPanel.jsx` | 5715 | `87a41ab7c60d2bde0ce803c5e9580bc9103266b859fcd66a5f4bffd2b51ae676` | ok |
| `src/components/Navbar.jsx` | 5270 | `26eaa6f1a40fa96e1d7e24437fd07d50f6902569ed972491d4a7df9a7451e40d` | ok |
| `src/components/PriceBreakdown.jsx` | 2622 | `ed07b304077d1b1c2c7ce7bbcc22ccd035531a8a59f799f0097e6796e0269116` | ok |
| `src/components/ProductCard.jsx` | 2950 | `1279e5bd6437c5fdf9f23afe5616bf78444a7812c23d1fff53603027c6aebb54` | ok |
| `src/components/ProtectedRoute.jsx` | 1069 | `f1121449bc7f8f31b2ed2d4a6e0211c8d300319efd58919efdd313dc7b586068` | ok |
| `src/components/QRPassport.jsx` | 1811 | `1388a4ca9e1d5e50fed00d5d779617be64a3ba9e1ac5c8db45ecbd680bc0de10` | ok |
| `src/components/RaizinhoCompanion.jsx` | 2963 | `a1ed822a49a7a4c8242e5bc0280f2391edea43fd9aa7c848a4361c74d3342de7` | ok |
| `src/components/RaizinhoMascot.jsx` | 4299 | `bd3fa227bb309009bc269c65d5dfdd9fdf6e224543e664627d78a56cedd80b37` | ok |
| `src/components/ScrollToTop.jsx` | 805 | `56f6ecc5d3f0bd692e7d4bb6d89f73ddac4148150718388ef8cf996a985f6138` | ok |
| `src/components/UserNotRegisteredError.jsx` | 1592 | `5cecb11fe2fb3a03a73e5845b5ee9d26c9255e80feda689b3dfc70822ba288f1` | ok |
| `src/data/mockData.js` | 28970 | `a84413cce6fe837897bb7b86c941407813e2a4e6dbd53420ee04784b0d11fc75` | ok |
| `src/hooks/use-mobile.jsx` | 545 | `a136217739e79f9d02440e711b9bd1abb6adf60f1a83b45a39a009a09568ad1c` | ok |
| `src/hooks/use-size.jsx` | 900 | `9d9e943e8dadcc95a2be6c40c20dee85029c87b443ed1fa1c6104d10ae7b9bdc` | ok |
| `src/lib/app-params.js` | 729 | `9a9654b09eaa21f651851caa75ddf05e5c95b2dbc3c2858d168264e0e36ed780` | ok |
| `src/lib/AppContext.jsx` | 4657 | `af002b2e421f14434b6a1a6d9bb6a8d8fc3edd9732cb93b34b54b81501f9f2ee` | ok |
| `src/lib/AuthContext.jsx` | 4393 | `2ac2133bc9448d8e8c0f12d3ccef7287f20efddfe0f4c90d0b517bbdc25c0fc0` | ok |
| `src/lib/authReturnTo.js` | 1470 | `945e12ab4a68e6166ddefbb9c91983d04e7b55db7bb2a3af628a192b95de01c9` | ok |
| `src/lib/PageNotFound.jsx` | 3930 | `8536e2091188275762a6729ecd77a77b8c5f1187525ae4189df42c95ca42f196` | ok |
| `src/lib/query-client.js` | 197 | `0a080b6d9a1ed9f5f32150d9e3faa928f955d2b8d6206831e2b1658e84612c92` | ok |
| `src/lib/raizinhoBus.js` | 1121 | `84d737f50c1d074093246836a56a4aeae5906cf3a6c360b83546922a8ecf2c07` | ok |
| `src/lib/utils.js` | 190 | `4f592359765d69c32c3617700fa111af9a6a9cac8f18cb1987c25503a343c203` | ok |
| `src/pages/Cart.jsx` | 11941 | `cf9d48c3f5b59bea401b92a314bad7c3a57081a1208b55a7d99c4d03a3bb68ff` | ok |
| `src/pages/Dashboard.jsx` | 3356 | `ca9fb4ad35d0eb429bb9c2817ea3943ad65d0bc32ea19a0f3061d63625460a20` | ok |
| `src/pages/Educational.jsx` | 2819 | `e2f17e2a5e15104c4f3d0992d424f1089dea49c4f20612b30ad3faf5b33b093a` | ok |
| `src/pages/ForgotPassword.jsx` | 2434 | `a5637ed3c56e98a97dd70ff74201a87383d9b9683af43599d39979e0b4a059f3` | ok |
| `src/pages/Home.jsx` | 8514 | `5d93c84c5994ea339247075ca57daaa9481f9692ba46aff4715fe9f50d5042c3` | ok |
| `src/pages/Impact.jsx` | 4943 | `a3737ee710573c7df91c647af251984d79a744391218f911d9f79dee8ca19a08` | ok |
| `src/pages/Login.jsx` | 4718 | `b816c8ab8c151f23611dfc35d9b00c4e84bebd37313caf6b18d69b156dcb9722` | ok |
| `src/pages/MapPage.jsx` | 4145 | `61ea3fbb9de390eaccfc30e4d34b4d221cdfa0fbdacfe8652f44ccb4c9834373` | ok |
| `src/pages/OAuthConsent.jsx` | 9904 | `010ab0d83bb6b84c371b7895c99b8ae6fa21b06253c4a705bf3edea4d18d030a` | ok |
| `src/pages/Orders.jsx` | 4438 | `5e0de2938eb346cf8e27407b37683c50e7254e75e29234599e00ccdc17427713` | ok |
| `src/pages/Passport.jsx` | 2833 | `53c67a8ccb326f51934d300dce25e2a8376124f0e0b8e992d5eed3017cd2587f` | ok |
| `src/pages/Producer.jsx` | 4726 | `10cab89eacacc64f40d205a3b198c0b48c3567f08014580fdfbb8c25a9d83309` | ok |
| `src/pages/ProducerDashboard.jsx` | 3837 | `c1859d1504971da80b91e63a1906caa7589d947c7e064bfdbb66bc32e36e492e` | ok |
| `src/pages/Producers.jsx` | 1989 | `16899af5ed826187aceccfd14b0890c2e94f5e55c0d86a5be395c14d37fa8dd5` | ok |
| `src/pages/ProductDetail.jsx` | 7537 | `614c2383c7ac2fa7833ae4e1e615901e492e869cdd0055ea842b2e178beae1ae` | ok |
| `src/pages/Products.jsx` | 5836 | `6c66af6b57a227a701f4aac2b66601c78aa67d04d6f3cfbf45feb5647a9f39b3` | ok |
| `src/pages/Profile.jsx` | 5065 | `4cc8e64e4a63aa1fb34d41ffd75be1571a5226a0a0f323ae22d2399a5a996834` | ok |
| `src/pages/Register.jsx` | 7047 | `0cb3dad1135233ccf342db7a2f30dbcc237aa661e0647f858aa9cd36bb08b0a6` | ok |
| `src/pages/ResetPassword.jsx` | 3729 | `e68c455710f69a5bd3028c3c42609eba8dd11155f076462cb3a1e0e18fc4c3f4` | ok |
| `src/utils/index.ts` | 97 | `1bd31d3e8630b19dcb1d92878a2501d5e29fc935eab48ec5d90e66c410cf7e1a` | ok |
| `src/App.jsx` | 3653 | `3ecd98d6c62edd5a28bac478bdea829347d3f6a037bc6a912fc9fff62e3947b5` | ok |
| `src/index.css` | 6036 | `19945892a3595c5cf1414e950c59ad5fc8fda90db43d806675fcdc082a10cbb1` | ok |
| `src/main.jsx` | 189 | `caa3bab80b647fbb53fccd2e80d6e190d45a4b06c92bf85e3968d87e8d891cec` | ok |
| `.gitignore` | 455 | `b36d13652aad88703a8f230b884fd93c01fbbb7d7e0d4a7752ae214bb5b6cb2d` | ok |
| `AGENTS.md` | 1592 | `e2c30f526e2bf4cc7bf0e53d396ca8306269a19040a5b5b90a2e5c6ceb9b93be` | ok |
| `CLAUDE.md` | 57 | `4c9691fea1d31f325645a9d86163cb92ff0097d7cd04cae4ab7d7aff05fa97cd` | ok |
| `components.json` | 444 | `73e1334afce0f20f01500532e3b63a7cc36238d8a05addef40c476fadf9dc349` | ok |
| `eslint.config.js` | 1578 | `b0ac68c36cb81cba5bbdd537620b03762164ba276e338fdba73981318f011e60` | ok |
| `index.html` | 1131 | `6d384210fd0f40bded69c5794a7cb9e4f091357cde208f4ebe419e6b216ec04d` | ok |
| `jsconfig.json` | 583 | `e73e9adf0fcd9194c496670efb5251825685314475c9548c3ec4d74056ccc75b` | ok |
| `package.json` | 3272 | `c002b41e4871a3eaacaaa2b8b9f7578ea9fed8917da5497bfd57b0e08ff7d34c` | ok |
| `postcss.config.js` | 80 | `190c877db466995bf1482f4a16abd06e04a89ede3119341e2a86ff96e1737b27` | ok |
| `README.md` | 3238 | `5c6fe0381c205771a272950c6c2b1742affb307d6d634160e7677448b23ae60d` | ok |
| `tailwind.config.js` | 2689 | `6c342077c8a18ed6ce5742a69d871ebed3d0af6101d133e8b7bfec4a7f02a9b3` | ok |
| `vite.config.js` | 617 | `d92e1eb3037080aa2a643aa3e7fd23b26ba946db9b78ce17e31e2dfc0bb1a586` | ok |
