"use strict";
// =========================================================
// O CÉREBRO - MOTOR LITÚRGICO GLOBAL
// =========================================================

const anoState = { ano: new Date().getFullYear() };
function calcularPascoa(ano) {
    const a = ano % 19, b = Math.floor(ano / 100), c = ano % 100;
    const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1;
    return { mes, dia };
}
function dP(n) { const d = new Date(anoState.pascoaObj); d.setDate(d.getDate() + n); return d; }

function inicializarEpocas() {
    const dataPascoa = calcularPascoa(anoState.ano);
    anoState.pascoaMes = dataPascoa.mes; anoState.pascoaDia = dataPascoa.dia;
    anoState.pascoaObj = new Date(anoState.ano, dataPascoa.mes - 1, dataPascoa.dia);
    anoState.epochSeptuagesima = dP(-63).getTime(); anoState.epochCinzas = dP(-46).getTime();
    anoState.epochLaetare = dP(-21).getTime(); anoState.epochRamosEntrada = dP(-7).getTime();
    anoState.epochSegSanta = dP(-6).getTime(); anoState.epochTerSanta = dP(-5).getTime();
    anoState.epochQuaSanta = dP(-4).getTime(); anoState.epochQuintaSanta = dP(-3).getTime();
    anoState.epochSextaSanta = dP(-2).getTime(); anoState.epochSabadoSanto = dP(-1).getTime();
    anoState.epochPascoa = dP(0).getTime(); anoState.epochAscensao = dP(39).getTime();
    anoState.epochFimAscensao = dP(46).getTime(); anoState.epochPentecostes = dP(49).getTime();
    anoState.epochFimOitPent = dP(56).getTime(); anoState.epochCorpus = dP(60).getTime();
    anoState.epochFimCorpus = dP(67).getTime(); anoState.epochCoracao = dP(68).getTime();
    anoState.epochFimCoracao = dP(75).getTime(); anoState.epochNatal = new Date(anoState.ano, 11, 25).getTime();

    anoState.ivAdv = new Date(anoState.ano, 11, 24);
    while (anoState.ivAdv.getDay() !== 0) anoState.ivAdv.setDate(anoState.ivAdv.getDate() - 1);
    anoState.iiiAdv = new Date(anoState.ivAdv); anoState.iiiAdv.setDate(anoState.ivAdv.getDate() - 7);
    anoState.iiAdv = new Date(anoState.ivAdv); anoState.iiAdv.setDate(anoState.ivAdv.getDate() - 14);
    anoState.iAdv = new Date(anoState.ivAdv); anoState.iAdv.setDate(anoState.ivAdv.getDate() - 21);
    anoState.ultimDom = new Date(anoState.iAdv); anoState.ultimDom.setDate(anoState.iAdv.getDate() - 7);
    anoState.cristoRei = new Date(anoState.ano, 9, 31);
    while (anoState.cristoRei.getDay() !== 0) anoState.cristoRei.setDate(anoState.cristoRei.getDate() - 1);
    anoState.epochQuaAdv = new Date(anoState.iiiAdv.getFullYear(), anoState.iiiAdv.getMonth(), anoState.iiiAdv.getDate() + 3).getTime();
    anoState.epochSexAdv = new Date(anoState.iiiAdv.getFullYear(), anoState.iiiAdv.getMonth(), anoState.iiiAdv.getDate() + 5).getTime();
    anoState.epochSabAdv = new Date(anoState.iiiAdv.getFullYear(), anoState.iiiAdv.getMonth(), anoState.iiiAdv.getDate() + 6).getTime();

    let quaSet = new Date(anoState.ano, 8, 15);
    while (quaSet.getDay() !== 3) quaSet.setDate(quaSet.getDate() + 1);
    anoState.epochQuaSet = quaSet.getTime();
    anoState.epochSexSet = new Date(quaSet.getFullYear(), quaSet.getMonth(), quaSet.getDate() + 2).getTime();
    anoState.epochSabSet = new Date(quaSet.getFullYear(), quaSet.getMonth(), quaSet.getDate() + 3).getTime();
}

const RITO = { DUPLEX_I: { abrev: "D.I.cl." }, DUPLEX_II: { abrev: "D.II.cl." }, DUPLEX_MAJ: { abrev: "D.maj." }, DUPLEX: { abrev: "D." }, SEMIDUPLEX: { abrev: "Sd." }, SIMPLEX: { abrev: "Simp." }, LOCAL: { abrev: "Local" } };
const TIPO = Object.freeze({ DOMINGO: "domingo", FESTA: "festa", FERIA: "feria", VIGILIA: "vigilia", OITAVA: "oitava", SABADO_BVM: "sabado_bvm", COMEMORACAO: "comemoracao", LOCAL: "local" });
const DIGNITAS = Object.freeze({ DOMINI: 60, BVM: 50, ANGELORUM: 40, BAPTISTAE: 30, JOSEPH: 20, APOSTOLORUM: 10 });
const PREC = Object.freeze({ DOMINGO_I_CLASSE: 100, FERIA_PRIVILEGIADA: 95, FESTA_I_CLASSE: 90, INFRA_OCTAVAM_PRIV_1_ORDEM: 89, DOMINGO_II_CLASSE: 85, FESTA_II_CLASSE: 80, VIGILIA_MAIOR: 78, FESTA_SENHOR_DUPLEX_MAJ: 65, DOMINGO_COMUM: 60, INFRA_OCTAVAM_PRIV_2_ORDEM: 55, FESTA_DUPLEX_MAJ: 50, DIA_OITAVA_COMUM: 50, FESTA_DUPLEX: 40, FESTA_SEMIDUPLEX: 35, INFRA_OCTAVAM_PRIV_3_ORDEM: 30, FERIA_MAIOR: 25, VIGILIA_COMUM: 22, INFRA_OCTAVAM: 20, SABADO_BVM: 12, FESTA_SIMPLEX: 10, FERIA_COMUM: 5, COMEMORACAO_FIXA: 3, PRO_ALIQUIBUS_LOCIS: 2 });
const COR = { BRANCA: "br", VERMELHA: "vm", VERDE: "vd", ROXA: "rx", PRETA: "pt", ROSA: "rs" };
const COR_TEXTO = { br: "c-br", vm: "c-vm", vd: "c-vd", rx: "c-rx", pt: "c-pt", rs: "c-rs" };
const ABREV_MESES = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
const PREF = { COMUM: "comum", QUARESMA: "quaresma", PASCAL: "pascal", NATAL: "natal", EPIFANIA: "epifania", APOSTOLOS: "apostolos", BVM: "bvm", CRUZ: "cruz", TRINDADE: "trindade", ASCENSAO: "ascensao", PENTECOSTES: "pentecostes", DEFUNTOS: "defuntos", DEDICACAO: "dedicacao", CORACAO: "coracao", SAO_JOSE: "sao_jose", CRISTO_REI: "cristo_rei" };
const SEQ = { VICTIMAE: "victimae", VENI: "veni", LAUDA: "lauda", DIES_IRAE: "dies_irae", STABAT: "stabat" };
const COMUM = { PROPRIA: "Própria", BVM: "Communi B.M.V.", SUM_PONT: "Communi Summorum Pontificum", DOCT: "Communi Doctorum", ABBATIS: "Communi Abbatis", CONF_PONT: "Communi Conf. Pont.", CONF_PONT_1: "Communi Conf. Pont., 1º loco", CONF_PONT_2: "Communi Conf. Pont., 2º loco", CONF_NPON: "Communi Conf. non Pont.", CONF_NPON_1: "Communi Conf. non Pont., 1º loco", CONF_NPON_2: "Communi Conf. non Pont., 2º loco", MART_1: "Communi unius Martyris", MART_1_2: "Communi unius Martyris, 2º loco", MART_1_TP: "Communi unius Martyris, 1º loco (T.P.)", MART_1_PONT: "Communi unius Martyris Pont.", MART_1_PONT_1: "Communi unius Martyris Pont., 1º loco", MART_1_PONT_2: "Communi unius Martyris Pont., 2º loco", MART_N: "Communi plur. Martyrum", MART_N_1: "Communi plur. Martyrum, 1º loco", MART_N_2: "Communi plur. Martyrum, 2º loco", MART_N_3: "Communi plur. Martyrum, 3º loco", MART_N_TP: "Communi plur. Martyrum (T.P.)", MART_N_PONT: "Communi plur. Martyrum Pont.", VIRG_1: "Communi Virginum", VIRG_1_1: "Communi Virginum, 1º loco", VIRG_1_2: "Communi Virginum, 2º loco", VIRG_1_3: "Communi Virginum, 3º loco", VIRG_MART: "Communi Virg. et Mart.", VIRG_MART_1: "Communi Virg. et Mart., 1º loco", VIRG_MART_2: "Communi Virg. et Mart., 2º loco", NON_VIRG: "Communi nec Virg. nec Mart.", APOSTOL: "Communi Apostolorum", EVANG_TP: "Communi Evangelistarum (T.P.)", DEDIC: "Dedicationis Ecclesiæ" };
const PREF_LABEL = { comum: "Comum", quaresma: "Quaresma", pascal: "Páscoa", natal: "Natal", epifania: "Epifania", apostolos: "Apóst.", bvm: "BVM", cruz: "Cruz", trindade: "Trind.", ascensao: "Ascensão", pentecostes: "Pentecostes", defuntos: "Defunt.", dedicacao: "Dedicação", coracao: "S. Coração", sao_jose: "São José", cristo_rei: "Cristo Rei" };
const SEQ_LABEL = { victimae: "Victimæ paschali", veni: "Veni Sancte Spiritus", lauda: "Lauda Sion", dies_irae: "Dies Iræ", stabat: "Stabat Mater" };
const COMM_LABEL = { natal: "do Natal", epifania: "da Epifania", quintafeira: "da Quinta-feira Santa", pascal: "pascal", ascensao: "da Ascensão", pentecostes: "de Pentecostes" };
const PREFACIOS_PROPRIOS = new Set([PREF.APOSTOLOS, PREF.BVM, PREF.CRUZ, PREF.TRINDADE, PREF.ASCENSAO, PREF.PENTECOSTES, PREF.DEFUNTOS, PREF.DEDICACAO, PREF.CORACAO, PREF.NATAL, PREF.EPIFANIA, PREF.PASCAL, PREF.SAO_JOSE, PREF.CRISTO_REI]);
const introitosPentecostesMap = { "I": "Tb 12. Benedicta sit sancta Trinitas", "II": "Sl 17. Factus est Dóminus protéctor meus", "III": "Sl 24. Réspice in me et miserére mei", "IV": "Sl 26. Dóminus illuminátio mea et salus mea", "V": "Sl 26. Exáudi Dómine vocem meam", "VI": "Sl 27. Dóminus fortitúdo plebis suæ", "VII": "Sl 46. Omnes gentes pláudite mánibus", "VIII": "Sl 47. Suscépimus Deus misericórdiam tuam", "IX": "Sl 53. Ecce Deus ádjuvat me", "X": "Sl 54. Dum clamárem ad Dóminum", "XI": "Sl 67. Deus in loco sancto suo", "XII": "Sl 69. Deus in adjutórium meum inténde", "XIII": "Sl 73. Réspice Dómine in testaméntum tuum", "XIV": "Sl 83. Protéctor noster áspice Deus", "XV": "Sl 85. Inclína Dómine aurem tuam", "XVI": "Sl 85. Miserére mihi Dómine quóniam ad te clamávi", "XVII": "Sl 118. Justus es Dómine", "XVIII": "Eclo 36. Da pacem Dómine sustinéntibus te", "XIX": "Est 13. Salus pópuli ego sum", "XX": "Dn 3. Omnia quæ fecísti nobis Dómine", "XXI": "Est 13. In voluntáte tua Dómine", "XXII": "Sl 129. Si iniquitátes observáveris Dómine", "XXIII": "Est 13. Salus pópuli ego sum", "XXIV": "Jr 29. Dicit Dóminus: Ego cógito cogitatiónes pacis", "XXV": "Jr 29. Dicit Dóminus: Ego cógito cogitatiónes pacis", "XXVI": "Jr 29. Dicit Dóminus: Ego cógito cogitatiónes pacis", "XXVII": "Jr 29. Dicit Dóminus: Ego cógito cogitatiónes pacis", "XXVIII": "Jr 29. Dicit Dóminus: Ego cógito cogitatiónes pacis" };



const SANTOS_FIXOS = {

  // [REGRA] Toda entrada aqui deve constar no Missal Romano universal pré-1954.
  // Em caso de dúvida sobre presença universal, usar PRO_ALIQUIBUS_LOCIS, nunca inserir
  // como entrada universal sem confirmação explícita da fonte (Missal 1920 ou edições até 1954).
  // =========================================================
  // MÊS DE JANEIRO
  // =========================================================
  "1-1": [{
      t:"Circuncisão de Nosso Senhor e Oitava do Natal",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Is 9. Puer natus est nobis... Tt 2,11-15 • Lc 2,21",
      l:"/2025/01/liturgia-diaria-01-jan-circuncisao-do.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL, communicantes: "natal", comum: COMUM.PROPRIA }
  }],
  "1-2": [{
      t:"Oitava de S. Estêvão, protomártir",
      rito:RITO.SIMPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Sl 118. Sedérunt príncipes... At 6,8-10; 7,54-59 • Mt 23,34-39",
      l:"/2025/01/liturgia-diaria-02-jan-oitava-de-S..html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.NATAL, communicantes: "natal", comum: COMUM.PROPRIA }
  }],
  "1-3": [{
      t:"Oitava de S. João, apóstolo e evang.",
      rito:RITO.SIMPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... Eclo 15,1-6 • Jo 21,19-24",
      l:"/2025/01/liturgia-diaria-03-jan-oitava-de-sao.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.NATAL, communicantes: "natal", comum: COMUM.PROPRIA }
  }],
  "1-4": [{
      t:"Oitava dos Santos Inocentes, mártires",
      rito:RITO.SIMPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Sl 8. Ex ore infantium Deus... Ap 14,1-5 • Mt 2,13-18",
      l:"/2024/12/liturgia-diaria-28-dez-os-S.s",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.NATAL, communicantes: "natal", comum: COMUM.PROPRIA }
  }],
"1-5": [{
      t:"Vigília da Epifania",
      rito:RITO.SEMIDUPLEX, prec:PREC.VIGILIA_MAIOR,
      s:"Sb 18. Dum médium siléntium... Gl 4,1-7 • Mt 2,19-23",
      l:"/2026/01/05-jan-vigilia-da-epifania.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.NATAL, communicantes: "natal", comum: COMUM.PROPRIA }
  }, {
      t:"S. Telésforo, papa e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.NATAL, comum: COMUM.SUM_PONT }
  }],
  "1-6": [{
      t: "Epifania do Senhor (com Oitava)",
      rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE,
      s:"Ml 3. Ecce advénit dominátor Dóminus... Is 60,1-6 • Mt 2,1-12",
      l:"/2025/01/liturgia-diaria-06-jan-epifania-do.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.EPIFANIA, communicantes: "epifania", comum: COMUM.PROPRIA }
  }],
  "1-7": [{
      t:"Na Oitava da Epifania",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_2_ORDEM,
      s:"Ml 3. Ecce advénit dominátor Dóminus... Is 60,1-6 • Mt 2,1-12",
      l:"/2025/01/liturgia-diaria-06-jan-epifania-do.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.EPIFANIA, communicantes: "epifania", comum: "da Epifania" }
  }],
  "1-8": [{
      t:"Na Oitava da Epifania",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_2_ORDEM,
      s:"Ml 3. Ecce advénit dominátor Dóminus... Is 60,1-6 • Mt 2,1-12",
      l:"/2025/01/liturgia-diaria-06-jan-epifania-do.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.EPIFANIA, communicantes: "epifania", comum: "da Epifania" }
  }],
  "1-9": [{
      t:"Na Oitava da Epifania",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_2_ORDEM,
      s:"Ml 3. Ecce advénit dominátor Dóminus... Is 60,1-6 • Mt 2,1-12",
      l:"/2025/01/liturgia-diaria-06-jan-epifania-do.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.EPIFANIA, communicantes: "epifania", comum: "da Epifania" }
  }],
  "1-10":[{
      t:"Na Oitava da Epifania",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_2_ORDEM,
      s:"Ml 3. Ecce advénit dominátor Dóminus... Is 60,1-6 • Mt 2,1-12",
      l:"/2025/01/liturgia-diaria-06-jan-epifania-do.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.EPIFANIA, communicantes: "epifania", comum: "da Epifania" }
  }],
  "1-11":[{
      t:"Na Oitava da Epifania",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_2_ORDEM,
      s:"Ml 3. Ecce advénit dominátor Dóminus... Is 60,1-6 • Mt 2,1-12",
      l:"/2025/01/liturgia-diaria-06-jan-epifania-do",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.EPIFANIA, communicantes: "epifania", comum: "da Epifania" }
  }, {
      t:"S. Higino, papa e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.EPIFANIA, comum: COMUM.SUM_PONT }
  }],
  "1-12":[{
      t:"Na Oitava da Epifania",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_2_ORDEM,
      s:"Ml 3. Ecce advénit dominátor Dóminus... Is 60,1-6 • Mt 2,1-12",
      l:"/2025/01/liturgia-diaria-06-jan-epifania-do",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.EPIFANIA, communicantes: "epifania", comum: "da Epifania" }
  }],
  "1-13":[{
      t:"Oitava da Epifania",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_SENHOR_DUPLEX_MAJ,
      s:"Ml 3. Ecce advénit dominátor Dóminus... Is 60,1-6 • Jo 1,29-34",
      l:"/2025/01/liturgia-diaria-13-jan-batismo-de-nosso.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.EPIFANIA, communicantes: "epifania", comum: COMUM.PROPRIA }
  }],
  "1-14":[{
      t:"S. Hilário de Poitiers, bispo e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l:"/2025/01/liturgia-diaria-14-jan-santo-hilario.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT, orProprias: true }
  }, {
      t:"S. Félix, presbítero e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 20. In virtúte tua... 2 Tm 2,8-10; 3,10-12 • Mt 10,26-32",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1_2 }
  }],
  "1-15":[{
      t:"S. Paulo Eremita, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 91. Justus ut palma florébit... Fl 3,7-12 • Mt 11,25-30",
      l:"/2025/01/liturgia-diaria-15-jan-sao-paulo.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON_2, orProprias: true }
  }, {
      t:"S. Mauro, abade",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditábitur sapiéntiam... Eclo 45,1-6 • Mt 19,27-29",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.ABBATIS }
  }],
  "1-16":[{
      t:"S. Marcelo I, papa e mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/2025/01/liturgia-diaria-16-jan-sao-marcelo-i.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT, orProprias: true }
  }],
  "1-17":[{
      t:"S. Antão, abade",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditábitur sapiéntiam... Eclo 45,1-6 • Lc 12,35-40",
      l:"/2025/01/liturgia-diaria-17-jan-s-antao-abade.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.ABBATIS, orProprias: true }
  }],
"1-18":[{
      t:"Cátedra de S. Pedro em Roma",
      isPedroPaulo:true,
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Eclo 45. Státuit ei Dóminus... 1 Pd 1,1-7 • Mt 16,13-19",
      l:"/2026/01/18-jan-catedra-de-s-pedro-em-roma.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA, orProprias: true }
  }, {
      t:"S. Paulo Apóstolo",
      isPedroPaulo:true,
      rito:null, prec:PREC.COMEMORACAO_FIXA,
      s:"2 Tm 1. Scio cui crédidi... Gl 1,11-20 • Mt 10,16-22",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.APOSTOLOS, comum: "Comemoração especial" }
  }, {
      t:"S. Prisca, virgem e mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 118. Me exspectavérunt peccatóres... Eclo 51,1-8; 51,12 • Mt 13,44-52",
      l:"/2025/01/l-iturgia-diaria-18-jan-s-maria-no.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.VIRG_MART_2 }
  }],
  "1-19":[{
      t:"Ss. Mário, Marta, Audífax e Abaco, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 36. Salus autem justórum... Hb 11,33-39 • Mt 24,3-13",
      l:"/2026/01/19-jan-ss-mario-marta-audifaz-e-abaco.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N_3, orProprias: true }
  }, {
      t:"S. Canuto, rei e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 20. In virtúte tua... Sb 10,10-14 • Mt 10,34-39",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1_2 }
  }],
  "1-20":[{
      t:"S. Fabiano, papa, e S. Sebastião, mártires",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 78. Intret in conspéctu tuo... Hb 11,33-39 • Lc 6,17-23",
      l:"/2025/01/liturgia-diaria-20-jan-s-fabiano-e-s.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N_1, orProprias: true }
  }],
  "1-21":[{
      t:"S. Inês, virgem e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 118. Me exspectavérunt peccatóres... Eclo 51,1-8; 51,12 • Mt 25,1-13",
      l:"/2025/01/liturgia-diaria-21-jan-santa-ines.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA, orProprias: true }
  }],
  "1-22":[{
      t:"Ss. Vicente e Anastácio, mártires",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 78. Intret in conspéctu tuo... Sb 3,1-8 • Lc 21,9-19",
      l:"/2025/01/liturgia-diaria-22-jan-ss-vicente-e.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N_1, orProprias: true }
  }],
"1-23":[{
      t:"S. Raimundo de Penaforte, confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 36. Os justi meditábitur sapiéntiam... Eclo 31,8-11 • Lc 12,35-40",
      l:"/2025/01/liturgia-diaria-23-jan-s-raimundo-de.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON_1, orProprias: true }
  }, {
      t:"S. Emerenciana, virgem e mártir",
      rito:null, prec:PREC.COMEMORACAO_FIXA,
      s:"Sl 118. Me exspectavérunt peccatóres... Eclo 51,1-8; 51,12 • Mt 13,44-52",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.VIRG_MART }
  }],
  "1-24":[{
      t:"S. Timóteo, bispo e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 45. Státuit ei Dóminus... 1 Tm 6,11-16 • Lc 14,26-33",
      l:"/2025/01/liturgia-diaria-24-jan-sao-timoteo.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1_PONT, orProprias: true }
  }],
"1-25":[{
      t:"Conversão de S. Paulo Apóstolo",
      isPedroPaulo:true,
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"2 Tm 1. Scio cui crédidi... At 9,1-22 • Mt 19,27-29",
      l:"/2025/01/liturgia-diaria-25-jan-conversao-de-sao.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA, orProprias: true }
  }, {
      t:"S. Pedro Apóstolo",
      isPedroPaulo:true,
      rito:null, prec:PREC.COMEMORACAO_FIXA,
      s:"Mt 16. Tu es Petrus... At 12,1-11 • Mt 16,13-19",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.APOSTOLOS, comum: "Comemoração especial" }
  }],
  "1-26":[{
      t:"S. Policarpo, bispo e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Dn 3. Sacerdótes Dei... 1 Jo 3,10-16 • Mt 10,26-32",
      l:"/2026/01/26-jan-s-policarpo-bispo-e-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1_PONT_2, orProprias: true }
  }],
  "1-27":[{
      t:"S. João Crisóstomo, bispo, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In médio Ecclésiæ apéruit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l:"/2025/01/liturgia-diaria-27-jan-sao-joao.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT, orProprias: true }
  }],
  "1-28":[{
      t:"S. Pedro Nolasco, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 91. Justus ut palma florébit... 1 Co 4,9-14 • Lc 12,32-34",
      l:"/2025/01/liturgia-diaria-28-jan-s-pedro-nolasco.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON_2, orProprias: true }
  }, {
      t:"S. Inês, virgem e mártir (segunda vez)",
      rito:null, prec:PREC.COMEMORACAO_FIXA,
      s:"Sl 118. Vultum tuum deprecabuntur... 2 Co 10,17-18; 11,1-2 • Mt 25,1-13",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "1-29":[{
      t:"S. Francisco de Sales, bispo e doutor",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Eclo 15. In médio Ecclésiæ apéruit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l:"/2025/01/liturgia-diaria-29-jan-sao-francisco-de.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT, orProprias: true }
  }],
  "1-30":[{
      t:"S. Martinha, virgem e mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 118. Loquébar de testimóniis tuis... Eclo 51,1-8; 51,12 • Mt 25,1-13",
      l:"/2025/01/liturgia-diaria-30-jan-santa-martinha.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.VIRG_MART_1, orProprias: true }
  }],
  "1-31":[{
      t:"S. João Bosco, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"3 Rs 4. Dedit illi Deus... Fl 4,4-9 • Mt 18,1-5",
      l:"/2025/01/liturgia-diaria-31-jan-s-joao-bosco.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA, orProprias: true }
  }],

  // =========================================================
  // MÊS DE FEVEREIRO
  // =========================================================
  "2-1": [{
      t:"S. Inácio de Antioquia, bispo e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Gl 6. Mihi autem absit gloriari... Rm 8,35-39 • Jo 12,24-26",
      l:"/2025/02/liturgia-diaria-01-fev-santo-inacio.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA, orProprias: true }
  }],
  "2-2": [{
      t:"Purificação da Santíssima Virgem Maria",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sl 47. Suscépimus, Deus, misericórdiam tuam... Ml 3,1-4 • Lc 2,22-32",
      l:"/2025/02/liturgia-diaria-02-fev-purificacao-de.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA, observacao: "Bênção das Velas (cor roxa) e Procissão" }
  }],
  "2-3": [{
      t:"S. Brás, bispo e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Dn 3. Sacerdótes Dei... 2 Co 1,3-7 • Mt 16,24-27",
      l:"/2025/02/liturgia-diaria-03-fev.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1_PONT_2, observacao: "Bênção das gargantas" }
  }],
  "2-4": [{
      t:"S. André Corsini, bispo e confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 45. Státuit ei Dóminus... Eclo 44,16-27; 45,3-20 • Mt 25,14-23",
      l:"/2026/02/04-fev-s-andre-corsini-bispo-e-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_PONT_1, orProprias: true }
  }],
  "2-5": [{
      t:"S. Águeda, virgem e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 44. Gaudeámus omnes in Dómino... 1 Co 1,26-31 • Mt 19,3-12",
      l:"/2025/02/liturgia-diaria-05-fev-santa-agueda.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA, orProprias: true }
  }],
  "2-6": [{
      t:"S. Tito, bispo e confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 45. Státuit ei Dóminus... Eclo 44,16-27; 45,3-20 • Lc 10,1-9",
      l:"/2025/02/liturgia-diaria-06-fev-s-tito.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_PONT_1, orProprias: true }
  }, {
      t:"S. Dorotéia, virgem e mártir",
      rito:null, prec:PREC.COMEMORACAO_FIXA,
      s:"Sl 118. Me exspectavérunt peccatóres... Eclo 51,1-8; 51,12 • Mt 13,44-52",
      l:"/2026/02/6-fev-s-doroteia-virgem-e-martir.html",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.VIRG_MART_2 }
  }],
  "2-7": [{
      t:"S. Romualdo, abade",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditábitur sapiéntiam... Eclo 45,1-6 • Mt 19,27-29",
      l:"/2025/02/liturgia-diaria-07-fev-s-romualdo.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.ABBATIS, orProprias: true }
  }],
  "2-8": [{
      t:"S. João da Mata, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditábitur sapiéntiam... Eclo 31,8-11 • Lc 12,35-40",
      l:"/2025/02/liturgia-diaria-08-fev-s-joao-da-mata.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON_1, orProprias: true }
  }],
  "2-9": [{
      t:"S. Cirilo de Alexandria, bispo, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In médio Ecclésiæ apéruit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l:"/2026/02/9-fev-s-cirilo-de-alexandria.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT, orProprias: true }
  }, {
      t:"S. Apolônia, virgem e mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 118. Loquébar de testimóniis tuis... Eclo 51,13-17 • Mt 25,1-13",
      l:"/2026/02/9-fev-s-apolonia.html",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.VIRG_MART_1 }
  }],
  "2-10":[{
      t:"S. Escolástica, virgem",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 44. Dilexísti justítiam et odísti iniquitátem... 2 Co 10,17-18; 11,1-2 • Mt 25,1-13",
      l:"/2025/02/liturgia-diaria-10-fev-s-escolastica.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.VIRG_1_1, orProprias: true }
  }],
  "2-11":[{
      t:"Aparição de N. Sra. Imaculada de Lourdes",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Ap 21. Vidi civitátem sanctam... Ap 11,19; 12,1-10 • Lc 1,26-31",
      l:"/2025/02/liturgia-diaria-11-fev-nossa-senhora-de.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "2-12":[{
      t:"Sete Ss. Fundadores dos Servitas, confessores",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sb 10. Justi decantavérunt... Eclo 44,1-15 • Mt 19,27-29",
      l:"/2025/02/liturgia-diaria-12-fev-os-sete.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA, orProprias: true }
  }],
  "2-14":[{
      t:"S. Valentim, presbítero e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 20. In virtúte tua... Sb 10,10-14 • Mt 10,34-39",
      l:"/2025/02/liturgia-diaria-14-fev-feria.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1_2 }
  }],
  "2-15":[{
      t:"Ss. Faustino e Jovita, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 36. Salus autem justórum... Hb 10,32-38 • Lc 12,1-8",
      l:"/2025/02/liturgia-diaria-15-fev-s-faustino-e.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N_3 }
  }],
  "2-18":[{
      t:"S. Simeão, bispo e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Eclo 45. Státuit ei Dóminus... Tg 1,12-18 • Mt 16,24-27",
      l:"/2025/02/liturgia-diaria-18-fev-feria.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1_PONT_1 }
  }],
"2-22":[{
      t:"Cátedra de S. Pedro em Antioquia",
      isPedroPaulo:true,
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Eclo 45. Státuit ei Dóminus... 1 Pd 1,1-7 • Mt 16,13-19",
      l:"/2025/02/liturgia-diaria-22-fev-catedra-de-sao.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA, orProprias: true }
  }, {
      t:"S. Paulo Apóstolo",
      isPedroPaulo:true,
      rito:null, prec:PREC.COMEMORACAO_FIXA,
      s:"2 Tm 1. Scio cui crédidi... Gl 1,11-20 • Mt 10,16-22",
      l:"/",
      p: { cor: COR.BRANCA, gloria: false, credo: false, prefacio: PREF.APOSTOLOS, comum: "Comemoração especial" }
  }],
  "2-23":[{
      t:"S. Pedro Damião, bispo e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In médio Ecclésiæ apéruit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l:"/2026/02/23-fev-s-pedro-damiao-bispo-e-doutor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT, orProprias: true }
  }, {
      t:"Vigília de S. Matias, apóstolo",
      rito:RITO.SIMPLEX, prec:PREC.VIGILIA_COMUM,
      s:"Sl 51. Ego autem sicut oliva fructifera... Eclo 44,25-27; 45,2-4; 45,6-9 • Jo 15,12-16",
      l:"/",
      p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: "Vigília Apostolorum" }
  }],
  "2-24":[{
      t:"S. Matias, apóstolo",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sl 138. Mihi autem nimis honoráti sunt amíci tui... At 1,15-26 • Mt 11,25-30",
      l:"/2025/02/liturgia-diaria-24-fev-s-matias.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA, orProprias: true }
  }],
  "2-27":[{
      t:"S. Gabriel da Virgem Dolorosa, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 11. Oculus Dei respéxit illum in bono... 1 Jo 2,14-17 • Mc 10,13-16",
      l:"/2025/02/liturgia-diaria-27-fev-s-gabriel-da.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA, orProprias: true }
  }],

  // =========================================================
  // MÊS DE MARÇO
  // =========================================================
  "3-4": [{
      t:"S. Casimiro, confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 36. Os justi meditábitur sapiéntiam... Eclo 31,8-11 • Lc 12,35-40",
      l:"/2025/03/liturgia-diaria-04-mar-s-casimiro.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON_1, orProprias: true }
  }, {
      t:"S. Lúcio I, papa e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "3-6": [{
      t:"Ss. Perpétua e Felicidade, mártires",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 118. Me exspectavérunt peccatóres... 1 Co 7,25-34 • Mt 13,44-52",
      l:"/2025/02/6-marco-s-perpetua-e-s-felicidade.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.NON_VIRG, orProprias: true }
  }],
  "3-7": [{
      t:"S. Tomás de Aquino, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In médio Ecclésiæ apéruit os ejus... Sb 7,7-14 • Mt 5,13-19",
      l:"/2025/02/7-marco-s-tomas-de-aquino-confessor-e.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT, orProprias: true }
  }],
  "3-8": [{
      t:"S. João de Deus, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditábitur sapiéntiam... 1 Jo 3,13-18 • Mt 22,34-46",
      l:"/2025/02/8-marco-s-joao-de-deus-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON_1, orProprias: true }
  }],
  "3-9": [{
      t:"S. Francisca Romana, viúva",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 118. Cognóvi, Dómine, quia aéquitas judícia tua... Pr 31,10-31 • Mt 13,44-52",
      l:"/2026/03/9-mar-francisca-romana-viuva.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.NON_VIRG, orProprias: true }
  }],
  "3-10":[{
      t:"Ss. Quarenta Mártires",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 33. Clamavérunt justi... Hb 11,33-39 • Lc 6,17-23",
      l:"/2025/03/liturgia-diaria-10-mar-segunda-feira-da.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N_3, orProprias: true }
  }],
  "3-12":[{
      t:"S. Gregório Magno, papa, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Jo 21. Si díligis me... 2 Tm 4,1-8 • Mt 5,13-19",
      l:"/2025/02/12-marco-s-gregorio-magno.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT, orProprias: true }
  }],
  "3-17":[{
      t:"S. Patrício, bispo e confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 45. Státuit ei Dóminus... Eclo 44,16-27; 45,3-20 • Mt 25,14-23",
      l:"/2025/03/17-marco-s-patricio-bispo-e-confessor-o.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_PONT_1, orProprias: true }
  }],
  "3-18":[{
      t:"S. Cirilo de Jerusalém, bispo, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In médio Ecclésiæ apéruit os ejus... Eclo 39,6-14 • Mt 10,23-28",
      l:"/2025/03/18-mar-s-cirilo-de-jerusalem.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT, orProprias: true }
  }],
  "3-19":[{
      t:"S. José, esposo da Santíssima Virgem",
      rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE,
      s:"Sl 91. Justus ut palma florébit... Eclo 45,1-6 • Mt 1,18-21",
      l:"/2025/03/liturgia-diaria-19-mar-s-jose-esposo-da.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.SAO_JOSE, comum: COMUM.PROPRIA }
  }],
  "3-21":[{
      t:"S. Bento, abade",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Sl 36. Os justi meditábitur sapiéntiam... Eclo 45,1-6 • Mt 19,27-29",
      l:"/2025/03/21-mar-s-bento-de-nursia-abade.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.ABBATIS, orProprias: true }
  }],
  "3-24":[{
      t:"S. Gabriel Arcanjo",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Sl 102. Benedícite Dóminum... Dn 9,21-26 • Lc 1,26-38",
      l:"/2025/03/24-de-marco-sao-gabriel-arcanjo-o.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "3-25":[{
      t:"Anunciação da Virgem Santíssima",
      rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE,
      s:"Sl 44. Vultum tuum deprecabúntur... Is 7,10-15 • Lc 1,26-38",
      l:"/2025/03/25-mar-anunciacao-de-nossa-senhora.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA, observacao: "Genuflexão no Et incarnatus est" }
  }],
  "3-27":[{
      t:"S. João Damasceno, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 72. Tenuísti manum déxteram meam... Sb 10,10-14 • Lc 6,6-11",
      l:"/2025/03/27-mar-s-joao-damasceno-confessor-e.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.PROPRIA, orProprias: true }
  }],
  "3-28":[{
      t:"S. João de Capistrano, confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Hab 3. Ego autem in Domino gaudébo... Sb 10,10-14 • Lc 9,1-6",
      l:"/2026/03/ver-pagina-98-do-missal-sd.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA, orProprias: true }
  }],

  // =========================================================
  // MÊS DE ABRIL
  // =========================================================
  "4-2": [{
      t: "S. Francisco de Paula, confessor",
      rito: RITO.DUPLEX, prec: PREC.FESTA_DUPLEX,
      s: "Sl 91. Justus ut palma florébit... Fp 3,7-12 • Lc 12,32-34",
      l: "/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.PASCAL, comum: COMUM.CONF_NPON_2, orProprias: true }
  }],
  "4-4": [{
      t: "S. Isidoro, bispo, confessor e doutor",
      rito: RITO.DUPLEX, prec: PREC.FESTA_DUPLEX,
      s: "Eclo 15. In médio Ecclésiæ apéruit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l: "/2025/04/4-abril-s-isidoro-confessor-e-doutor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.PASCAL, comum: COMUM.DOCT, orProprias: true }
  }],
  "4-5": [{
      t: "S. Vicente Férrer, confessor",
      rito: RITO.DUPLEX, prec: PREC.FESTA_DUPLEX,
      s: "Sl 36. Os justi meditábitur sapiéntiam... Eclo 31,8-11 • Lc 12,35-40",
      l: "/2025/04/5-abril-s-vicente-ferrer-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.PASCAL, comum: COMUM.CONF_NPON_1, orProprias: true }
  }],
  "4-11":[{
      t: "S. Leão I (Magno), papa, confessor e doutor",
      rito: RITO.DUPLEX, prec: PREC.FESTA_DUPLEX,
      s: "Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l: "/2025/11/11abr-s-leao-i-magno-papa-confessor-e.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.PASCAL, comum: COMUM.SUM_PONT, orProprias: true }
  }],
  "4-13":[{
      t: "S. Hermenegildo, mártir",
      rito: RITO.SEMIDUPLEX, prec: PREC.FESTA_SEMIDUPLEX,
      s: "Sl 63. Protexísti me, Deus, a convéntu malignántium... Sb 5,1-5 • Lc 14,26-33",
      l: "/2026/04/13-abril-s-hermenegildo-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.PASCAL, comum: COMUM.MART_1_TP, orProprias: true }
  }],
  "4-14":[{
      t: "S. Justino, mártir",
      rito: RITO.DUPLEX, prec: PREC.FESTA_DUPLEX,
      s: "Sl 118. Narravérunt mihi iníqui fabulatiónes... 1 Co 1,18-25; 1,30 • Lc 12,2-8",
      l: "/2026/04/14-abril-s-justino-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.PASCAL, comum: COMUM.PROPRIA, orProprias: true }
  }, {
      t: "Ss. Tibúrcio, Valeriano e Máximo, mártires",
      rito: RITO.SIMPLEX, prec: PREC.FESTA_SIMPLEX,
      s: "Sl 144. Sancti tui, Dómine, benedícent te... 1 Pd 1,3-7 • Jo 15,1-7",
      l: "/2026/04/14-abril-ss-tiburcio-valeriano-e-maximo.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.PASCAL, comum: COMUM.MART_N_TP }
  }],
  "4-17":[{
      t: "S. Aniceto, papa e mártir",
      rito: RITO.SIMPLEX, prec: PREC.FESTA_SIMPLEX,
      s: "Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l: "/2025/04/17-abril-s-aniceto-papa-e-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.PASCAL, comum: COMUM.SUM_PONT }
  }],
  "4-21":[{
      t: "S. Anselmo, bispo, confessor e doutor",
      rito: RITO.DUPLEX, prec: PREC.FESTA_DUPLEX,
      s: "Eclo 15. In médio Ecclésiæ apéruit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l: "/2026/04/21-abril-s-anselmo-bispo-confessor-e.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.PASCAL, comum: COMUM.DOCT, orProprias: true }
  }],
  "4-22":[{
      t: "Ss. Sotero e Caio, papas e mártires",
      rito: RITO.SEMIDUPLEX, prec: PREC.FESTA_SEMIDUPLEX,
      s: "Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l: "/2026/04/22-abril-ss-sotero-e-caio-papas-e.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.PASCAL, comum: COMUM.SUM_PONT }
  }],
  "4-23":[{
      t: "S. Jorge, mártir",
      rito: RITO.SEMIDUPLEX, prec: PREC.FESTA_SEMIDUPLEX,
      s: "Sl 63. Protexísti me, Deus, a convéntu malignántium... 2 Tm 2,8-10; 3,10-12 • Jo 15,1-7",
      l: "/2026/04/sao-jorge-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.PASCAL, comum: COMUM.MART_1_TP, orProprias: true }
  }],
  "4-24":[{
      t: "S. Fidélis de Sigmaringa, mártir",
      rito: RITO.DUPLEX, prec: PREC.FESTA_DUPLEX,
      s: "Sl 63. Protexísti me, Deus, a convéntu malignántium... Sb 5,1-5 • Jo 15,1-7",
      l: "/2026/04/s-fiel-de-sigmaringa.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.PASCAL, comum: COMUM.MART_1_TP, orProprias: true }
  }],
  "4-25":[{
      t: "São Marcos, evangelista",
      rito: RITO.DUPLEX_II,  prec: PREC.FESTA_II_CLASSE,
      s: "Sl 63. Protexísti me, Deus, a convéntu malignántium... Ez 1,10-14 • Lc 10,1-9",
      l: "/2025/04/25-de-abril-sao-marcos-evangelista.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.EVANG_TP, orProprias: true }
  }, {
      t: "Litanias Maiores (Rogações)",
      isLitania: true, prec: PREC.FERIA_MAIOR,
      s: "Sl 17. Exaudívit de templo sancto suo... Tg 5,16-20 • Lc 11,5-13",
      l: "/",
      p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.PASCAL, observacao: "Litanias na Procissão" }
  }],
  "4-26":[{
      t: "Ss. Cleto e Marcelino, papas e mártires",
      rito: RITO.SEMIDUPLEX, prec: PREC.FESTA_SEMIDUPLEX,
      s: "Sl 144. Sancti tui, Dómine, benedícent te... 1 Pd 1,3-7 • Jo 15,1-7",
      l: "/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.PASCAL, comum: COMUM.MART_N_TP }
  }],
  "4-27":[{
      t: "S. Pedro Canísio, confessor e doutor",
      rito: RITO.DUPLEX, prec: PREC.FESTA_DUPLEX,
      s: "Eclo 15. In médio Ecclésiæ apéruit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l: "/2026/04/27-abril-s-pedro-canisio-confessor-e.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.PASCAL, comum: COMUM.DOCT, orProprias: true }
  }],
  "4-28":[{
      t: "S. Paulo da Cruz, confessor",
      rito: RITO.DUPLEX, prec: PREC.FESTA_DUPLEX,
      s: "Gl 2. Christo confíxus sum cruci... 1 Co 1,17-25 • Lc 10,1-9",
      l: "/2025/04/28-marco-s-paulo-da-cruz-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.PASCAL, comum: COMUM.PROPRIA, orProprias: true }
  }, {
      t: "S. Vital, mártir",
      rito: null, prec: PREC.COMEMORACAO_FIXA,
      s: "Sl 63. Protexísti me, Deus, a convéntu malignántium... Sb 5,1-5 • Jo 15,1-7",
      l: "/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.PASCAL, comum: COMUM.MART_1_TP }
  }],
  "4-29":[{
      t: "S. Pedro de Verona, mártir",
      rito: RITO.DUPLEX, prec: PREC.FESTA_DUPLEX,
      s: "Sl 63. Protexísti me, Deus, a convéntu malignántium... 2 Tm 2,8-10; 3,10-12 • Jo 15,1-7",
      l: "/2025/04/29-abril-sao-pedro-de-verona-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.PASCAL, comum: COMUM.MART_1_TP, orProprias: true }
  }],
  "4-30":[{
      t: "S. Catarina de Sena, virgem",
      rito: RITO.DUPLEX, prec: PREC.FESTA_DUPLEX,
      s: "Sl 44. Dilexísti justítiam et odísti iniquitátem... 2 Co 10,17-18; 11,1-2 • Mt 25,1-13",
      l: "/2025/04/30-abril-s-catarina-de-sena-virgem.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.PASCAL, comum: COMUM.VIRG_1_3, orProprias: true }
  }],
  
  // =========================================================
  // MÊS DE MAIO
  // =========================================================
  "5-1": [{
      t:"Ss. Filipe e Tiago Menor, apóstolos",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Ne 9. Exclamaverunt ad te Domine... Sb 5,1-5 • Jo 14,1-13",
      l:"/2025/05/1-maio-ss-filipe-e-tiago-apostolos.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA }
  }],
  "5-2": [{
      t:"S. Atanásio, bispo, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... 2 Co 4,5-14 • Mt 10,23-28",
      l:"/2025/05/02-maio-s-atanasio-bispo-confessor-e.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT }
  }],
  "5-3": [{
      t:"Invenção da Santa Cruz",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Gl 6. Nos autem gloriari oportet... Fl 2,5-11 • Jo 3,1-15",
      l:"/2025/05/03-maio-invencao-da-santa-cruz.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.CRUZ, comum: COMUM.PROPRIA }
  }],
  "5-4": [{
      t:"S. Mônica, viúva",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 118. Cognovi Domine quia æquitas judicia tua... 1 Tm 5,3-10 • Lc 7,11-16",
      l:"/2026/05/405-santa-monica-viuva-modelo-de-esposa.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.NON_VIRG }
  }],
  "5-5": [{
      t:"S. Pio V, papa e confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/2025/05/05-maio-s-pio-v-papa-e-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "5-6": [{
      t:"S. João ante a Porta Latina",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Sl 63. Protexisti me Deus a conventu malignantium... Sb 5,1-5 • Mt 20,20-23",
      l:"/2025/05/6-maio-s-joao-apostolo-e-evangelista.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA }
  }],
  "5-7": [{
      t:"S. Estanislau, bispo e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 63. Protexisti me Deus a conventu malignantium... Sb 5,1-5 • Jo 15,1-7",
      l:"/2025/05/6-maio-s-estanislau-bispo-e-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1_TP }
  }],
  "5-8": [{
      t:"Aparição de S. Miguel Arcanjo",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Sl 102. Benedícite Dóminum omnes Angeli ejus... Ap 1,1-5 • Mt 18,1-10",
      l:"/2025/05/08-maio-aparicao-de-sao-miguel-arcanjo.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "5-9": [{
      t:"S. Gregório Nazianzeno, bispo, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... Eclo 39,6-14 • Mt 5,13-19",
      l:"/2025/05/09-maio-sao-gregorio-nazianzeno-bispo.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT, orProprias: true, observacao: "Epístola própria" }
  }],
"5-10":[{
      t:"S. Antonino, bispo e confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 45. Statuit ei Dominus testamentum pacis... Eclo 44,16-27; 45,3-20 • Mt 25,14-23",
      l:"/2025/05/10-maio-santo-antonino-bispo-e-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_PONT }
  }, {
      t:"Ss. Gordiano e Epímaco, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 144. Sancti tui Domine benedicent te... 1 Pd 1,3-7 • Jo 15,1-7",
      l:"/2026/05/10-maio-s-gordiano-e-s-epimaco-martires.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.PASCAL, comum: COMUM.MART_N_TP, orProprias: true, observacao: "Epístola própria" }
  }],
  "5-12":[{
      t:"Ss. Nereu, Aquileu, Domitila e Pancrácio, mártires",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 32. Ecce oculi Domini super timentes eum... Sb 5,1-5 • Jo 4,46-53",
      l:"/2025/05/12-maio-ss-nereu-aquileu-domitila-e.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "5-13":[{
      t:"S. Roberto Belarmino, bispo, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... Sb 7,7-14 • Mt 5,13-19",
      l:"/2025/05/13-maio-sao-roberto-belarmino-bispo.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT }
  }, {
      t:"Nossa Senhora do Rosário de Fátima",
      rito:RITO.LOCAL, prec:PREC.PRO_ALIQUIBUS_LOCIS,
      s:"Sedul. Salve, sancta parens... Eclo 24,14-16 • Lc 11,27-28",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "5-14":[{
      t:"S. Bonifácio, mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 63. Protexisti me Deus a conventu malignantium... Sb 5,1-5 • Jo 15,1-7",
      l:"/2025/05/14-maio-missa-da-feria.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1 }
  }],
  "5-15":[{
      t:"S. João Batista de la Salle, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Mt 18,1-5",
      l:"/2025/05/15-maio-s-joao-batista-de-la-salle.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON, orProprias: true }
  }],
  "5-16":[{
      t:"S. Ubaldo, bispo e confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Eclo 45. Statuit ei Dominus testamentum pacis... Eclo 44,16-27; 45,3-20 • Mt 25,14-23",
      l:"/2025/05/16-maio-santo-ubaldo-bispo-e-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_PONT }
  }],
  "5-17":[{
      t:"S. Pascoal Bailão, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Lc 12,35-40",
      l:"/2025/05/17-maio-s-pascoal-bailao-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON }
  }],
  "5-18":[{
      t:"S. Venâncio, mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 63. Protexisti me Deus a conventu malignantium... Sb 5,1-5 • Jo 15,1-7",
      l:"/2025/05/18-maio-s-venancio-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1_TP, orProprias: true }
  }],
"5-19":[{
      t:"S. Pedro Celestino, papa e confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/2025/05/19-maio-s-pedro-celestino-papa-e.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA }
  }, {
      t:"S. Pudenciana, virgem",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 44. Dilexisti justitiam... 2 Co 10,17-18; 11,1-2 • Mt 25,1-13",
      l:"/2026/05/19-de-maio-santa-pudenciana-virgem-o.html",
      p: { cor: COR.BRANCA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.VIRG_1_3, orProprias: true }
  }],
  "5-20":[{
      t:"S. Bernardino de Sena, confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Mt 19,27-29",
      l:"/2025/05/20-maio-s-bernardino-de-sena-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "5-22":[{
      t:"Santa Rita de Cássia, viúva",
      rito:RITO.LOCAL, prec:PREC.PRO_ALIQUIBUS_LOCIS,
      s:"Sl 118. Cognovi Domine quia æquitas judicia tua... Pr 31,10-31 • Mt 13,44-52",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.NON_VIRG }
  }],
  "5-25":[{
      t:"S. Gregório VII, papa e confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 24,42-47",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }, {
      t:"S. Urbano I, papa e mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "5-26":[{
      t:"S. Felipe Néri, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Rm 5. Caritas Dei diffusa est in cordibus nostris... Sb 7,7-14 • Lc 12,35-40",
      l:"/2025/05/26-maio-s-filipe-neri-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"S. Eleutério, papa e mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "5-27":[{
      t:"S. Beda, o Venerável, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l:"/2025/05/27-maio-s-beda-o-veneravel-confessor-e_27.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT }
  }, {
      t:"S. João I, papa e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/2026/05/27-maio-sao-joao-i-papa-e-martir-o-bom.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "5-28":[{
      t:"S. Agostinho de Cantuária, bispo e confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 131. Sacerdotes tui induantur justitiam... 1 Ts 2,2-9 • Lc 10,1-9",
      l:"/2026/05/28-maio-sao-agostinho-de-cantuaria.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_PONT }
  }],
  "5-29":[{
      t:"S. Maria Madalena de Pazzi, virgem",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 44. Dilexisti justitiam et odisti iniquitatem... 2 Co 10,17-18; 11,1-2 • Mt 25,1-13",
      l:"/2026/05/29-maio-santa-maria-madalena-de-pazzi.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.VIRG_1_3, orProprias: true }
  }],
  "5-30":[{
      t:"S. Félix I, papa e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Jo 21. Si díligis me... Sb 5,1-5 • Jo 15,1-7",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }, {
      t:"S. Joana d'Arc, virgem",
      rito:RITO.LOCAL, prec:PREC.PRO_ALIQUIBUS_LOCIS,
      s:"Sb 8. Proposui ergo hanc assumere mihi... Sb 8,9-15 • Lc 10,21-24",
      l:"https://f1descatholica.blogspot.com/2025/05/30-maio-feria.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"S. Fernando III, rei e confessor",
      rito:RITO.LOCAL, prec:PREC.PRO_ALIQUIBUS_LOCIS,
      s:"Sl 36. Os justi meditabitur sapientiam... Sb 10,10-14 • Lc 19,12-26",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON }
  }],
"5-31":[{
      t:"Nossa Senhora Rainha",
      rito:RITO.DUPLEX_II, 
      prec:PREC.FESTA_II_CLASSE,
      s:"Sl 44. Gaudeamus omnes in Domino... Eclo 24,5; 7; 9-11; 30-31 • Lc 1,26-33",
      l:"/2025/05/31-maio-nossa-senhora-rainha.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }, {
      t:"S. Petronila, virgem",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 44. Vultum tuum deprecabuntur omnes divites plebis... 2 Co 10,17-18; 11,1-2 • Mt 25,1-13",
      l:"/",
      p: { cor: COR.BRANCA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.VIRG_1 }
  }],

  // =========================================================
  // MÊS DE JUNHO
  // =========================================================
  "6-1": [{
      t:"Santa Ângela Merici, virgem",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 44. Dilexisti justitiam et odisti iniquitatem... 2 Co 10,17-18; 11,1-2 • Mt 25,1-13",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.VIRG_1 }
  }],
  "6-2": [{
      t:"Ss. Marcelino, Pedro e Erasmo, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 33. Clamaverunt justi... Rm 8,18-23 • Lc 21,9-19",
      l:"/2025/06/2-junho-feria-ss-marcelino-pedro-e.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "6-4": [{
      t:"S. Francisco Caracciolo, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 21. Factum est cor meum... Sb 4,7-14 • Lc 12,35-40",
      l:"/2025/06/04-junho-s-francisco-caracciolo.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "6-5": [{
      t:"S. Bonifácio, bispo e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 63. Lætábitur justus in Domino... 1 Jo 3,13-18 • Mt 10,26-32",
      l:"/2025/06/05-junho-s-bonifacio-bispo-e-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "6-6": [{
      t:"S. Norberto, bispo e confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 45. Statuit ei Dominus testamentum pacis... Eclo 44,16-27; 45,3-20 • Mt 25,14-23",
      l:"/2025/06/06-junho-s-norberto-bispo-e-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_PONT }
  }],
  "6-9": [{
      t:"Ss. Primo e Feliciano, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Eclo 44. Sapientiam sanctorum narrant populi... Sb 5,16-20 • Mt 11,25-30",
      l:"/2026/06/09-junho-santos-primo-e-feliciano.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "6-10":[{
      t:"S. Margarida, rainha e viúva",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 118. Cognovi Domine quia æquitas judicia tua... Pr 31,10-31 • Mt 13,44-52",
      l:"/2026/06/10-jun-santa-margarida-da-escocia.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.NON_VIRG }
  }],
  "6-11":[{
      t:"S. Barnabé, apóstolo",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Sl 138. Mihi autem nimis honorati sunt amici tui... At 11,21-26; 13,1-3 • Mt 10,16-22",
      l:"/2025/06/11-junho-s-barnabe-apostolo.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA }
  }],
  "6-12":[{
      t:"S. João de S. Facundo, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Lc 12,35-40",
      l:"/2026/06/12-junho-sao-joao-de-sao-facundo.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON }
  }, {
      t:"Ss. Basílides, Cirino, Nabor e Nazário, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 78. Intret in conspectu... Hb 10,32-38 • Mt 24,3-13",
      l:"/2025/06/12-junho-ss-basilides-e-companheiros.html",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "6-13":[{
      t:"S. Antônio de Pádua, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l:"/2025/06/13-junho-s-antonio-de-padua-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "6-14":[{
      t:"S. Basílio Magno, bispo, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... 2 Tim 4, 1-8 • Lc 14,26-35",
      l:"/2025/06/14-junho-s-basilio-magno-bispo.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT, orProprias: true, observacao: "Epístola e Evang. próprios" }
  }],
  "6-15":[{
      t:"Ss. Vito, Modesto e Crescência, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 33. Multæ tribulatiónes justórum... Sb 3,1-8 • Lc 10,16-20",
      l:"/2026/06/15-jun-santos-vito-modesto-e-crescencia.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "6-18":[{
      t:"S. Efrém, diácono, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l:"/2025/06/18-junho-s-efrem-diacono-confessor-e.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT }
  }, {
      t:"Ss. Marcos e Marceliano, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 36. Salus autem justorum a Domino... Hb 10,32-38 • Lc 12,1-8",
      l:"/2026/06/18-jun-santos-marcos-e-marceliano.html",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "6-19":[{
      t:"S. Juliana Falconieri, virgem",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 44. Dilexisti justitiam et odisti iniquitatem... 2 Co 10,17-18; 11,1-2 • Mt 25,1-13",
      l:"/2026/06/19-junho-s-juliana-falconieri-virgem.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.VIRG_3 }
  }, {
      t:"Ss. Gervásio e Protásio, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 84. Loquétur Dóminus... 1 Pd 4,13-19 • Lc 6,17-23",
      l:"/2026/06/19-junho-ss-gervasio-e-protasio.html",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: "Missa Própria" }
  }],
  "6-20":[{
      t:"S. Silvério, papa e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4.10-11 • Mt 16,13-19",
      l:"/2025/06/20-junho-na-oitava-de-corpus-christi.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "6-21":[{
      t:"S. Luís Gonzaga, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 8. Minuisti eum paulo minus ab Angelis... Eclo 31,8-11 • Mt 22,29-40",
      l:"/2025/06/21-junho-s-luis-gonzaga-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "6-22":[{
      t:"S. Paulino, bispo e confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 45. Statuit ei Dominus testamentum pacis... 2 Co 8,9-15 • Lc 12,32-34",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_PONT }
  }],
"6-23":[{
      t:"Vigília da Natividade de S. João Batista",
      rito:RITO.SEMIDUPLEX, prec:PREC.VIGILIA_COMUM,
      s:"Lc 1. Ne timeas Zacharia... Jr 1,4-10 • Lc 1,5-17",
      l:"/2025/06/23-junho-vigilia-da-natividade-de-s.html",
      p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "6-24":[{
      t: "Natividade de S. João Batista (com Oitava)",
      rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE,
      s:"Is 49. De ventre matris meæ vocavit me Dominus... Is 49,1-3.5-7 • Lc 1,57-68",
      l:"/2025/06/24-junho-natividade-de-s-joao-batista.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
 "6-25":[{
      t:"S. Guilherme, abade",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 45,1-6 • Mt 19,27-29",
      l:"/2025/06/25-junho-s-guilherme-abade.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.ABBATIS }
  }, {
      t:"Na Oitava de S. João Batista",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Is 49. De ventre matris meæ... Is 49,1-3.5-7 • Lc 1,57-68",
      l:"/2025/06/24-junho-natividade-de-s-joao-batista.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: "da Festa" }
  }],
  "6-26":[{
      t:"Ss. João e Paulo, mártires",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 33. Multæ tribulationes justorum... Ap 11,3-7 • Lc 12,1-8",
      l:"/2025/06/26-junho-ss-joao-e-paulo-martires.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"Na Oitava de S. João Batista",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Is 49. De ventre matris meæ... Is 49,1-3.5-7 • Lc 1,57-68",
      l:"/2025/06/24-junho-natividade-de-s-joao-batista.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: "da Festa" }
  }],
  "6-27":[{
      t:"Nossa Senhora do Perpétuo Socorro",
      rito:RITO.LOCAL, prec:PREC.PRO_ALIQUIBUS_LOCIS,
      s:"Sedul. Salve, sancta parens... Eclo 24,14-16 • Lc 11,27-28",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }, {
      t:"Na Oitava de S. João Batista",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Is 49. De ventre matris meæ... Is 49,1-3.5-7 • Lc 1,57-68",
      l:"/2025/06/24-junho-natividade-de-s-joao-batista.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: "da Festa" }
  }],
  "6-28":[{
      t:"S. Irineu, bispo e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Ml 2. Lex veritatis fuit in ore ejus... 2 Tm 3,14-17; 4,1-5 • Mt 10,28-33",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"Vigília dos Ss. Pedro e Paulo",
      rito:RITO.SEMIDUPLEX, prec:PREC.VIGILIA_COMUM,
      s:"Jo 21. Dicit Dominus Petro... At 3,1-10 • Jo 21,15-19",
      l:"/",
      p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"Na Oitava de S. João Batista",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Is 49. De ventre matris meæ... Is 49,1-3.5-7 • Lc 1,57-68",
      l:"/2025/06/24-junho-natividade-de-s-joao-batista.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: "da Festa" }
  }],
  "6-29":[{
      t: "Ss. Pedro e Paulo, Apóstolos (com Oitava)",
      isPedroPaulo:true,
      rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE,
      s:"At 12. Nunc scio vere quia misit Dominus Angelum suum... At 12,1-11 • Mt 16,13-19",
      l:"/2025/06/29junho-sao-pedro-e-sao-paulo-apostolos.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA }
  }, {
      t:"Na Oitava de S. João Batista",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Is 49. De ventre matris meæ... Is 49,1-3.5-7 • Lc 1,57-68",
      l:"/2025/06/24-junho-natividade-de-s-joao-batista.html",
      p: { cor: COR.BRANCA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: "da Festa" }
  }],
"6-30":[{
      t:"Comemoração de S. Paulo Apóstolo",
      isPedroPaulo:true,
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"2 Tm 1. Scio cui credidi... Gl 1,11-20 • Mt 10,16-22",
      l:"/2025/06/30-junho-comemoracao-de-s-paulo-apostolo.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA }
  }, {
      t:"S. Pedro Apóstolo",
      isPedroPaulo:true,
      rito:null, prec:PREC.COMEMORACAO_FIXA,
      s:"Mt 16. Tu es Petrus... At 12,1-11 • Mt 16,13-19",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.APOSTOLOS, comum: "Comemoração especial" }
  }, {
      t:"Na Oitava de S. João Batista",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Is 49. De ventre matris meæ... Is 49,1-3.5-7 • Lc 1,57-68",
      l:"/2025/06/24-junho-natividade-de-s-joao-batista.html",
      p: { cor: COR.BRANCA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: "da Festa" }
  }],

  // =========================================================
  // MÊS DE JULHO
  // =========================================================
  "7-1": [{
      t:"Festa do Preciosíssimo Sangue de N.S.J.C.",
      rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE,
      s:"Ap 5. Redemisti nos Domine in sanguine tuo... Hb 9,11-15 • Jo 19,30-35",
      l:"/2025/07/01-julho-festa-do-preciosissimo-sangue.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.CRUZ, comum: COMUM.PROPRIA }
  }, {
      t:"Dia da Oitava de S. João Batista",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Is 49. De ventre matris meæ... Is 49,1-3.5-7 • Lc 1,57-68",
      l:"/2025/06/24-junho-natividade-de-s-joao-batista.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM }
  }],
  "7-2": [{
      t:"Visitação da Santíssima Virgem Maria",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sedul. Salve sancta parens... Ct 2,8-14 • Lc 1,39-47",
      l:"/2025/07/02-julho-visitacao-de-nossa-senhora.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }, {
      t:"Ss. Processo e Martiniano, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sb 3. Judicant sancti gentes... Hb 11,33-39 • Lc 12,1-8",
      l:"/2025/07/02-julho-ss-processo-e-martiano-martires.html",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "7-3": [{
      t:"S. Leão II, papa e confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/2025/07/03-julho-s-leao-ii-papa-e-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "7-5": [{
      t:"S. Antônio Maria Zaccaria, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"1 Cor 2. Sermo meus et prædicatio mea... 1 Tm 4,8-16 • Mc 10,15-21",
      l:"/2025/07/05-julho-s-antonio-maria-zaccaria.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "7-6": [{
      t:"Oitava dos Ss. Pedro e Paulo, apóstolos",
      isPedroPaulo:true,
      isOitava:true,
      rito:RITO.DUPLEX_MAJ, prec:PREC.DIA_OITAVA_COMUM,
      s:"At 12. Nunc scio vere quia misit Dominus Angelum suum... At 12,1-11 • Mt 14,22-33",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA }
  }],
  "7-7": [{
      t:"Ss. Cirilo e Metódio, bispos e confessores",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 131. Sacerdotes tui induantur justitiam... Hb 7,23-27 • Lc 10,1-9",
      l:"/2025/07/ss-cirilo-e-medodio-bispos-e-confessores.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "7-8": [{
      t:"S. Isabel, Rainha de Portugal, viúva",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 118. Cognovi Domine quia æquitas judicia tua... Pr 31,10-31 • Mt 13,44-52",
      l:"/2025/07/08-julho-s-isabel-rainha-de-portugal.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.NON_VIRG }
  }],
  "7-10":[{
      t:"Sete Irmãos mártires, Ss. Rufina e Secunda",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 112. Laudate pueri Dominum... Pr 31,10-31 • Mt 12,46-50",
      l:"/2025/07/10-julho-ss-sete-irmaos-martires-e-ss.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "7-11":[{
      t:"S. Pio I, papa e mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/2025/07/11-julho-feria.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "7-12":[{
      t:"S. João Gualberto, abade",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 45,1-6 • Mt 5,43-48",
      l:"/2025/07/12-julho-s-joao-gualberto-abade.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.ABBATIS }
  }, {
      t:"Ss. Nabor e Félix, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 33. Clamaverunt justi... Rm 8,18-23 • Lc 21,9-19",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "7-13":[{
      t:"S. Anacleto, papa e mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "7-14":[{
      t:"S. Boaventura, bispo, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... Eclo 39,6-14 • Mt 5,13-19",
      l:"/2025/07/s-boaventura-bispo-confessor-e-doutor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT }
  }],
  "7-15":[{
      t:"S. Henrique, imperador e confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Lc 12,35-40",
      l:"/2025/07/15-julho-santo-henrique-imperador-e.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON }
  }],
  "7-16":[{
      t:"Nossa Senhora do Carmo",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Sl 44. Gaudeamus omnes in Domino... Eclo 24,23-31 • Lc 11,27-28",
      l:"/2025/07/16-julho-festa-de-nossa-senhora-do-carmo.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "7-17":[{
      t:"S. Aleixo, confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... 1 Tm 6,11-12 • Mt 19,27-29",
      l:"/2025/07/17-julho-santo-aleixo-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "7-18":[{
      t:"S. Camilo de Léllis, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Jo 15. Majorem hac dilectionem nemo habet... 1 Jo 3,13-18 • Jo 15,12-16",
      l:"/2025/07/18-julho-s-camilo-de-lellis-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"S. Sinforosa e seus sete filhos, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 33. Clamaverunt justi... Rm 8,18-23 • Lc 21,9-19",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "7-19":[{
      t:"S. Vicente de Paulo, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 91. Justus ut palma florebit... 1 Co 4,9-14 • Lc 12,32-34",
      l:"/2025/07/19-julho-s-vicente-de-paulo-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "7-20":[{
      t:"S. Jerônimo Emiliani, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Is 58,7-11 • Mt 19,13-21",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"S. Margarida, virgem e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 118. Me exspectaverunt peccatores... Eclo 51,1-8; 12 • Mt 13,44-52",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.VIRG_MART }
  }],
  "7-21":[{
      t:"S. Práxedes, virgem",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 118. Loquebar de testimoniis tuis... 1 Co 7,25-34 • Mt 13,44-52",
      l:"/2025/07/21-julho-s-praxedes-virgem.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "7-22":[{
      t:"S. Maria Madalena, penitente",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 118. Me exspectaverunt peccatores ut perderent me... Ct 3,2-5; 8,6-7 • Lc 7,36-50",
      l:"/2025/07/s-maria-madalena-penitente.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "7-23":[{
      t:"S. Apolinário, bispo e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Dn 3. Sacerdotes Dei benedicite Dominum... 1 Pd 5,1-11 • Lc 22,24-30",
      l:"/2025/07/s-apolinario-bispo-e-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"S. Libório, bispo e confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Eclo 45. Statuit ei Dominus testamentum pacis... Eclo 44,16-27; 45,3-20 • Mt 25,14-23",
      l:"/",
      p: { cor: COR.BRANCA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_PONT }
  }],
  "7-24":[{
      t:"Vigília de S. Tiago Maior, apóstolo",
      rito:RITO.SEMIDUPLEX, prec:PREC.VIGILIA_COMUM,
      s:"Sl 51. Ego autem sicut oliva fructifera in domo Domini... 1 Co 4,9-14 • Jo 15,12-16",
      l:"/2025/07/24-julho-vigilia-de-s-tiago-apostolo.html",
      p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"S. Cristina, virgem e mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 118. Me exspectaverunt peccatores ut perderent me... Eclo 51,1-8; 12 • Mt 13,44-52",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.VIRG_MART }
  }],
  "7-25":[{
      t:"S. Tiago Maior, apóstolo",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sl 138. Mihi autem nimis honorati sunt amici tui Deus... 1 Co 4,9-15 • Mt 20,20-23",
      l:"/2025/07/25-julho-s-tiago-maior-apostolo.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA }
  }, {
      t:"S. Cristóvão, mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 20. In virtute tua Domine lætabitur justus... Tg 1,12-18 • Mt 16,24-27",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1 }
  }],
  "7-26":[{
      t:"S. Ana, mãe da Santíssima Virgem Maria",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sl 44. Gaudeamus omnes in Domino... Pr 31,10-31 • Mt 13,44-52",
      l:"/2025/07/26-julho-s-ana-mae-de-nossa-senhora.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "7-27":[{
      t:"S. Pantaleão, mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 20. In virtute tua Domine lætabitur justus... 2 Tm 2,8-10; 3,10-12 • Mt 10,26-32",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1 }
  }],
  "7-28":[{
      t:"Ss. Nazário e Celso, mártires",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 78. Intret in conspectu tuo Domine... Sb 10,17-20 • Lc 21,9-19",
      l:"/2025/07/28-julho-ss-nazario-e-celso-martires-s.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"S. Vítor I, papa e mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 10-11 • Mt 16,13-19",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }, {
      t:"S. Inocêncio I, papa e confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 10-11 • Mt 16,13-19",
      l:"/",
      p: { cor: COR.BRANCA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "7-29":[{
      t:"S. Marta, virgem",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 44. Dilexisti justitiam et odisti iniquitatem... 2 Co 10,17-18; 11,1-2 • Lc 10,38-42",
      l:"/2025/07/29-julho-s-marta-virgem.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"Ss. Félix II, Simplício, Faustino e Beatriz, mártires",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 36. Salus autem justorum a Domino... Hb 10,32-38 • Lc 12,1-8",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "7-30":[{
      t:"Ss. Abdon e Sennen, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 78. Intret in conspectu tuo Domine... 2 Co 6,4-10 • Mt 5,1-12",
      l:"/2025/07/30-julho-ss-abdao-e-senen-martires.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "7-31":[{
      t:"S. Inácio de Loyola, confessor",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Fp 2. In nomine Jesu omne genu flectatur... 2 Tm 2,8-10; 3,10-12 • Lc 10,1-9",
      l:"/2025/07/31-julho-s-inacio-de-loiola-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],

  // =========================================================
  // MÊS DE AGOSTO
  // =========================================================
  "8-1": [{
      t:"S. Pedro Acorrentado",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"At 12. Nunc scio vere, quia misit Dominus Angelum suum... At 12,1-11 • Mt 16,13-19",
      l:"/2025/08/01-ago-s-pedro-apostolo-as-correntes.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA }
  }],
  "8-2": [{
      t:"S. Afonso Maria de Ligório, bispo, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Lc 4. Spiritus Domini super me... 2 Tm 4,1-8 • Lc 10,1-9",
      l:"/2025/08/02-ago-s-afonso-maria-de-ligorio.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "8-3": [{
      t:"Invenção de S. Estêvão, protomártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 118. Sederunt principes... At 6,8-10; 7,54-59 • Mt 23,34-39",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "8-4": [{
      t:"S. Domingos, confessor",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Sl 36. Os justi meditabitur sapientiam... 2 Tm 4,1-8 • Lc 12,35-40",
      l:"/2025/08/04-ago-s-domingos-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "8-5": [{
      t:"Dedicação da Basílica de S. Maria Maior (Nossa Senhora das Neves)",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Sedul. Salve, sancta parens... Eclo 24,14-16 • Lc 11,27-28",
      l:"/2025/08/05-ago-dedicacao-de-n-senhora-das-neves.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "8-6": [{
      t:"Transfiguração de Nosso Senhor Jesus Cristo",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sl 96. Illuxerunt coruscationes tuæ... 2 Pd 1,16-19 • Mt 17,1-9",
      l:"/2025/08/06-ago-transfiguracao-de-nosso-senhor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL, comum: COMUM.PROPRIA }
  }],
  "8-7": [{
      t:"S. Caetano, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Mt 6,24-33",
      l:"/2025/08/07-ago-s-caetano-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "8-8": [{
      t:"Ss. Ciríaco, Largo e Esmaragdo, mártires",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 33. Timete Dominum, omnes sancti ejus... 1 Ts 2,13-16 • Mc 16,15-18",
      l:"/2025/08/08-ago-ss-ciriaco-largo-e-esmaragdo.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "8-9": [{
      t:"S. João Maria Vianney, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Lc 12,35-40",
      l:"/2025/08/09-ago-s-joao-maria-vianney-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON }
  }, {
      t:"Vigília de S. Lourenço",
      rito:RITO.SEMIDUPLEX, prec:PREC.VIGILIA_COMUM,
      s:"Sl 111. Dispersit, dedit pauperibus... Eclo 51,1-8; 12 • Mt 16,24-27",
      l:"/2025/08/09-ago-vigilia-de-s-lourenco.html",
      p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"S. Romão, mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 63. Lætabitur justus in Domino... 2 Tm 2,8-10; 3,10-12 • Mt 10,26-32",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1 }
  }],
  "8-10":[{
      t:"S. Lourenço, mártir (com Oitava Simples)",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sl 95. Confessio et pulchritudo in conspectu ejus... 2 Co 9,6-10 • Jo 12,24-26",
      l:"/2025/08/10-ago-s-lourenco-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "8-11":[{
      t:"Ss. Tibúrcio e Susana, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 36. Salus autem justorum a Domino... Hb 11,33-39 • Lc 12,1-8",
      l:"/2025/08/11-ago-ss-tiburcio-e-susana-martires.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "8-12":[{
      t:"S. Clara, virgem",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 44. Dilexisti justitiam, et odisti iniquitatem... 2 Co 10,17-18; 11,1-2 • Mt 25,1-13",
      l:"/2025/08/12-ago-s-clara-virgem.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.VIRG_1 }
  }],
  "8-13":[{
      t:"Ss. Hipólito e Cassiano, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 36. Salus autem justorum a Domino... Hb 10,32-38 • Lc 12,1-8",
      l:"/2025/08/13-ago-ss-hipolito-e-cassiano-martires.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
"8-14":[{
      t:"Vigília da Assunção da Santíssima Virgem Maria",
      rito:RITO.SEMIDUPLEX, prec:PREC.VIGILIA_MAIOR,
      s:"Sl 44. Vultum tuum deprecabuntur omnes divites plebis... Eclo 24,23-31 • Lc 11,27-28",
      l:"/2025/08/14-ago-vigilia-de-nossa-senhora-da.html",
      p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "8-15":[{
      t:"Assunção da Bem-Aventurada Virgem Maria (com Oitava)",
      rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE,
      s:"Ap 12. Signum magnum apparuit in cælo... Jt 13,22-25; 15,10 • Lc 1,41-50",
      l:"/2025/08/15-ago-assuncao-de-nossa-senhora.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "8-16":[{
      t:"S. Joaquim, pai da Santíssima Virgem Maria",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sl 111. Dispersit, dedit pauperibus... Eclo 31,8-11 • Mt 1,1-16",
      l:"/2025/08/16-ago-s-joaquim-confessor-pai-de-nossa.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "8-17":[{
      t:"S. Jacinto, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Lc 12,35-40",
      l:"/2025/08/17-ago-s-jacinto-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.CONF_NPON }
  }, {
      t:"Oitava de S. Lourenço",
      rito:RITO.SIMPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Sl 95. Confessio et pulchritudo... 2 Co 9,6-10 • Jo 12,24-26",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: "da Festa" }
  }],
  "8-18":[{
      t:"Quarto dia na Oitava da Assunção",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Ap 12. Signum magnum apparuit in cælo... Jt 13,22-25; 15,10 • Lc 1,41-50",
      l:"/2025/08/15-ago-assuncao-de-nossa-senhora",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: "da Festa" }
  }, {
      t:"S. Agapito, mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 20. Lætabitur justus... 2 Tm 2,8-10; 3,10-12 • Mt 10,26-32",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1 }
  }],
  "8-19":[{
      t:"S. João Eudes, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Mt 11,25-30",
      l:"/2025/08/19-ago-s-joao-eudes-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "8-20":[{
      t:"S. Bernardo, abade e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... Eclo 39,6-14 • Mt 5,13-19",
      l:"/2025/08/20-ago-s-bernardo-confessor-e-doutor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.DOCT }
  }],
  "8-21":[{
      t:"S. Joana Francisca de Chantal, viúva",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 118. Cognovi, Domine, quia æquitas judicia tua... Pr 31,10-31 • Mt 13,44-52",
      l:"/2025/08/21-ago-s-joana-francisca-de-chantal.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "8-22":[{
      t:"Imaculado Coração de Maria",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Hb 4. Adeamus cum fiducia ad thronum gratiæ... Eclo 24,17-21 • Jo 19,25-27",
      l:"/2025/08/22-ago-imaculado-coracao-de-maria.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }, {
      t:"Oitava da Assunção de Nossa Senhora",
      rito:RITO.SIMPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Ap 12. Signum magnum apparuit in cælo... Jt 13,22-25; 15,10 • Lc 1,41-50",
      l:"/",
      p: { cor: COR.BRANCA, gloria: false, credo: false, prefacio: PREF.BVM, comum: "da Festa" }
  }, {
      t:"Ss. Timóteo, Hipólito e Sinforiano, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 36. Salus autem justorum a Domino... Hb 10,32-38 • Lc 12,1-8",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "8-23":[{
      t:"S. Filipe Benício, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 91. Justus ut palma florebit... 1 Co 4,9-14 • Lc 12,32-34",
      l:"/2025/08/23-ago-s-filipe-benicio-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"Vigília de S. Bartolomeu, apóstolo",
      rito:RITO.SIMPLEX, prec:PREC.VIGILIA_COMUM,
      s:"Sl 51. Ego autem sicut oliva... Eclo 44,25-27; 45,2-4; 6-9 • Jo 15,12-16",
      l:"/",
      p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "8-24":[{
      t:"S. Bartolomeu, apóstolo",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sl 138. Mihi autem nimis honorati sunt amici tui, Deus... 1 Co 12,27-31 • Lc 6,12-19",
      l:"/2025/08/24-ago-s-bartolomeu-apostolo.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA }
  }],
  "8-25":[{
      t:"S. Luís IX, rei e confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Sb 10,10-14 • Lc 19,12-26",
      l:"/2025/08/25-ago-s-luis-rei-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "8-26":[{
      t:"S. Zeferino, papa e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Jo 21. Si diligis me, Simon Petre, pasce agnos meos... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/2025/08/26-ago-sao-zeferino-papa-e-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "8-27":[{
      t:"S. José de Calasanz, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 33. Venite, filii, audite me... Sb 10,10-14 • Mt 18,1-5",
      l:"/2025/08/27-ago-s-jose-de-calasanz-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "8-28":[{
      t:"S. Agostinho, bispo, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l:"/2025/08/28-ago-s-agostinho-bispo-confessor-e.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT }
  }, {
      t:"S. Hermes, mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 63. Protexisti me Deus a conventu malignantium... Sb 5,1-5 • Lc 14,26-33",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1 }
  }],
  "8-29":[{
      t:"Degolação de S. João Batista",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Sl 118. Loquebar de testimoniis tuis in conspectu regum... Jr 1,17-19 • Mc 6,17-29",
      l:"/2025/08/29-ago-degola-de-s-joao-batista.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "8-30":[{
      t:"S. Rosa de Lima, virgem",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 44. Dilexisti justitiam, et odisti iniquitatem... 2 Co 10,17-18; 11,1-2 • Mt 25,1-13",
      l:"/2025/08/30-de-ago-santa-rosa-de-lima-virgem.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.VIRG_1 }
  }],
  "8-31":[{
      t:"S. Raimundo Nonato, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Lc 12,35-40",
      l:"/2025/08/31-ago-s-raimundo-nonato-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON }
  }],

  // =========================================================
  // MÊS DE SETEMBRO
  // =========================================================
  "9-1": [{
      t:"S. Egídio, abade",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 45,1-6 • Mt 19,27-29",
      l:"/2025/09/01-set-s-egidio-abade.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.ABBATIS }
  }, {
      t:"Os Doze Santos Irmãos Mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 33. Clamaverunt justi... Rm 8,18-23 • Lc 21,9-19",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "9-2": [{
      t:"S. Estêvão, rei e confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Lc 19,12-26",
      l:"/2025/09/02-set-s-estevao-rei-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON }
  }],
  "9-3": [{
      t:"S. Pio X, papa e confessor",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Jo 21. Si diligis me, Simon Petre, pasce agnos meos... 1 Ts 2,2-8 • Jo 21,15-17",
      l:"/2025/09/03-set-s-pio-x-papa-e-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "9-5": [{
      t:"S. Lourenço Justiniano, bispo e confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Eclo 45. Statuit ei Dominus testamentum pacis... Eclo 44,16-27; 45,3-20 • Mt 25,14-23",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_PONT }
  }],
  "9-8": [{
      t:"Natividade da B. V. Maria (com Oitava Simples)",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sedul. Salve, sancta parens... Pr 8,22-35 • Mt 1,1-16",
      l:"/2025/09/08-set-natividade-de-nossa-senhora.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "9-9": [{
      t:"S. Gorgônio, mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 63. Lætabitur justus in Domino... Tg 1,12-18 • Lc 14,26-33",
      l:"/2025/09/09-de-setembro-s-pedro-claver-confessor.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1 }
  }],
  "9-10":[{
      t:"S. Nicolau de Tolentino, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 91. Justus ut palma florebit... 1 Co 4,9-14 • Lc 12,32-34",
      l:"/2025/09/10-de-setembro-sao-nicolau-de-tolentino.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON }
  }],
  "9-11":[{
      t:"Ss. Proto e Jacinto, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 36. Salus autem justorum a Domino... Rm 8,18-23 • Lc 21,9-19",
      l:"/2025/09/11-set-ss-proto-e-jacinto-martires.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "9-12":[{
      t:"Santíssimo Nome de Maria",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Sl 44. Vultum tuum deprecabuntur omnes divites plebis... Eclo 24,23-31 • Lc 1,26-38",
      l:"/2025/09/12-set-o-santissimo-nome-de-maria.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "9-14":[{
      t:"Exaltação da Santa Cruz",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_SENHOR_DUPLEX_MAJ,
      s:"Gl 6. Nos autem gloriari oportet in cruce... Fl 2,5-11 • Jo 12,31-36",
      l:"/2025/09/14-set-exaltacao-da-santa-cruz.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.CRUZ, comum: COMUM.PROPRIA }
  }],
  "9-15":[{
      t:"As Sete Dores de Nossa Senhora",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Jo 19. Stabant juxta crucem Jesu... Jt 13,22-25 • Jo 19,25-27",
      l:"/2025/09/15-set-as-sete-dores-de-nossa-senhora.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, sequencia: SEQ.STABAT, prefacio: PREF.BVM, comum: COMUM.PROPRIA, observacao: "BVM na Transfixão" }
  }, {
      t:"Oitava da Natividade de Nossa Senhora",
      rito:RITO.SIMPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Sedul. Salve, sancta parens... Pr 8,22-35 • Mt 1,1-16",
      l:"/",
      p: { cor: COR.BRANCA, gloria: false, credo: false, prefacio: PREF.BVM, comum: "da Festa" }
  }],
  "9-16":[{
      t:"Ss. Cornélio e Cipriano, mártires",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 78. Intret in conspectu tuo... Sb 3,1-8 • Lc 21,9-19",
      l:"/2025/09/16-set-s-cornelio-papa-e-s-cipriano.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N_PONT }
  }],
  "9-17":[{
      t:"Impressão dos Estigmas de S. Francisco de Assis",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Gl 6. Mihi autem absit gloriari... Gl 6,14-18 • Mt 24,42-47",
      l:"/2025/09/17-set-impressao-dos-estigmas-de-s.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "9-18":[{
      t:"S. José de Cupertino, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 1. Dilectio Dei honorabilis sapientia... 1 Co 13,1-8 • Mt 22,1-14",
      l:"/2025/09/18-set-s-jose-de-cupertino-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "9-19":[{
      t:"S. Januário, bispo e companheiros, mártires",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Salus autem justorum a Domino... Hb 10,32-38 • Mt 24,3-13",
      l:"/2025/09/19-set-s-januario-bispo-e-seus.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "9-20":[{
      t:"Ss. Eustáquio e companheiros, mártires",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 33. Clamaverunt justi... Hb 11,33-39 • Lc 6,17-23",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"Vigília de S. Mateus, apóstolo e evang.",
      rito:RITO.SIMPLEX, prec:PREC.VIGILIA_COMUM,
      s:"Sl 51. Ego autem sicut oliva... Ez 1,10-14 • Mt 9,9-13",
      l:"/",
      p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "9-21":[{
      t:"S. Mateus, apóstolo e evangelista",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sl 138. Mihi autem nimis honorati sunt amici tui, Deus... Ez 1,10-14 • Mt 9,9-13",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA }
  }],
  
  
  "9-22":[{
      t:"S. Tomás de Vilanova, bispo e confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 45. Statuit ei Dominus testamentum pacis... Eclo 44,16-27; 45,3-20 • Mt 25,14-23",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_PONT }
  }, {
      t:"S. Maurício e companheiros, mártires",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 78. Intret in conspectu tuo... Sb 10,17-20 • Lc 21,9-19",
      l:"/2025/09/22-set-s-mauricio-e-companheiros.html",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "9-23":[{
      t:"S. Lino, papa e mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Jo 21. Si diligis me, Simon Petre, pasce agnos meos... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/2025/09/23-set-s-lino-papa-e-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "9-24":[{
      t:"Nossa Senhora das Mercês",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Sedul. Salve, sancta parens... Eclo 24,14-16 • Lc 11,27-28",
      l:"/2025/09/24-set-nossa-senhora-das-merces-nossa.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "9-26":[{
      t:"Ss. Cipriano e Justina, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 36. Salus autem justorum a Domino... Hb 10,32-38 • Mt 10,28-33",
      l:"/2025/09/26-set-s-cipriano-martir-e-s-justina.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "9-27":[{
      t:"Ss. Cosme e Damião, mártires",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Eclo 44. Sapientiam sanctorum narrant populi... Sb 5,16-20 • Lc 6,17-23",
      l:"/2025/09/27-set-ss-cosme-e-damiao-martires.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "9-28":[{
      t:"S. Venceslau, duque e mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 20. In virtute tua, Domine, lætabitur justus... Sb 10,10-14 • Mt 10,34-39",
      l:"/2025/09/28-set-s-venceslau-duque-e-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "9-29":[{
      // [LOCKED-RITO] A Dedicação de S. Miguel é I Classe (Duplex I. cl.) no rito pré-1954. NÃO REBAIXAR.
      t:"Dedicação de S. Miguel Arcanjo",
      rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE,
      s:"Sl 102. Benedicite Dominum, omnes Angeli ejus... Ap 1,1-5 • Mt 18,1-10",
      l:"/2025/09/29-set-dedicacao-de-s-miguel-arcanjo.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "9-30":[{
      t:"S. Jerônimo, presbítero, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l:"/2025/09/30-set-s-jeronimo-presbitero-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT }
  }],

  // =========================================================
  // MÊS DE OUTUBRO
  // =========================================================
  "10-1": [{
      t:"S. Remígio, bispo e confessor",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Eclo 45. Statuit ei Dominus testamentum pacis... Eclo 44,16-27; 45,3-20 • Lc 12,35-40",
      l:"/2025/10/01-out-s-remigio-bispo-e-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_PONT }
  }],
  "10-2": [{
      t:"Santos Anjos da Guarda",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Sl 102. Benedicite Dominum omnes Angeli ejus... Ex 23,20-23 • Mt 18,1-10",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "10-3": [{
      t:"S. Teresa do Menino Jesus, virgem",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 44. Vultum tuum deprecabuntur... Is 66,12-14 • Mt 18,1-4",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "10-4": [{
      t:"S. Francisco de Assis, confessor",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Gl 6. Mihi autem absit gloriari... Gl 6,14-18 • Mt 11,25-30",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "10-5": [{
      t:"Ss. Plácido e companheiros, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 36. Salus autem justorum a Domino... Rm 8,18-23 • Lc 12,1-8",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "10-6": [{
      t:"S. Bruno, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Lc 12,35-40",
      l:"/2025/10/06-out-s-bruno-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON }
  }],
  "10-7": [{
      t:"Nossa Senhora do Rosário",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sl 44. Gaudeamus omnes in Domino... Pr 8,22-24; 32-35 • Lc 1,26-38",
      l:"/2025/10/07-out-nossa-senhora-do-santo-rosario.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "10-8": [{
      t:"S. Brígida, viúva",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 118. Cognovi Domine quia aequitas judicia tua... 1 Tm 5,3-10 • Mt 13,44-52",
      l:"/2025/10/08-out-s-brigida-viuva.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "10-9": [{
      t:"S. João Leonardo, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"2 Cor 4. Inluxit in cordibus nostris... 2 Co 4,1-6; 15-18 • Lc 10,1-9",
      l:"/2025/10/09-out-s-joao-leonardi-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"Ss. Dionísio, Rústico e Eleutério, mártires",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 78. Intret in conspectu tuo Domine... 2 Co 6,4-10 • Lc 12,1-8",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "10-10":[{
      t:"S. Francisco de Borja, confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 45,1-6 • Mt 19,27-29",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON }
  }],
  "10-11":[{
      t:"Maternidade da Santíssima Virgem Maria",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Is 7. Ecce Virgo concipiet et pariet filium... Eclo 24,23-31 • Lc 2,43-51",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "10-12":[{
      t:"Nossa Senhora da Conceição Aparecida",
      rito:RITO.LOCAL, prec:PREC.PRO_ALIQUIBUS_LOCIS,
      s:"Est 14. Recordare, Virgo Mater... Eclo 24,23-31 • Jo 2,1-11",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "10-13":[{
      t:"S. Eduardo, rei e confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Lc 12,35-40",
      l:"/2025/10/13-out-s-eduardo-rei-e-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON }
  }],
  "10-14":[{
      t:"S. Calisto I, papa e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Jo 21. Si diligis me Simon Petre... 1 Pd 5,1-4; 10-11 • Mt 16,13-19",
      l:"/2025/10/14-out-s-calisto-i-papa-e-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "10-15":[{
      t:"S. Teresa de Ávila, virgem",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 44. Dilexisti justitiam et odisti iniquitatem... 2 Co 10,17-18; 11,1-2 • Mt 25,1-13",
      l:"/2025/10/15-out-s-teresa-virgem.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "10-16":[{
      t:"S. Edwiges, viúva",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 118. Cognovi Domine quia aequitas judicia tua... Pr 31,10-31 • Mt 13,44-52",
      l:"/2025/10/16-out-s-hedviges-virgem.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.NON_VIRG }
  }],
  "10-17":[{
      t:"S. Margarida Maria Alacoque, virgem",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Cant 2. Sub umbra illius quem desideraveram... Ef 3,8-9; 14-19 • Mt 11,25-30",
      l:"/2025/10/17-out-s-margarida-maria-alacoque-virgem.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "10-18":[{
      t:"S. Lucas, evangelista",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sl 138. Mihi autem nimis honorati sunt amici tui Deus... 2 Co 8,16-24 • Lc 10,1-9",
      l:"/2025/10/18-out-s-lucas-evangelista.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA }
  }],
  "10-19":[{
      t:"S. Pedro de Alcântara, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Fl 3,7-12 • Lc 12,32-34",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "10-20":[{
      t:"S. João Câncio, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 18. Miseratio hominis circa proximum suum... Tg 2,12-17 • Lc 12,35-40",
      l:"/2025/10/20-out-s-joao-cancio-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "10-21":[{
      t:"S. Hilarião, abade",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Lc 12,35-40",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.ABBATIS }
  }, {
      t:"S. Úrsula e companheiras, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 44. Vultum tuum deprecabuntur... 1 Co 7,25-34 • Mt 25,1-13",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: "Communi plur. Virg. et Mart." }
  }],
  "10-24":[{
      t:"S. Rafael Arcanjo",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Sl 102. Benedicite Dominum omnes Angeli ejus... Tb 12,7-15 • Jo 5,1-15",
      l:"/2025/10/24-out-s-rafael-arcanjo.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "10-25":[{
      t:"Ss. Crisanto e Daria, mártires",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 78. Intret in conspectu tuo Domine... 2 Co 6,4-10 • Lc 11,47-51",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "10-26":[{
      t:"S. Evaristo, papa e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "10-27":[{
      t:"Vigília de Ss. Simão e Judas Tadeu, apóstolos",
      rito:RITO.SIMPLEX, prec:PREC.VIGILIA_COMUM,
      s:"Sl 78. Intret in conspectu tuo Domine... 1 Co 4,9-14 • Jo 15,1-7",
      l:"/",
      p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "10-28":[{
      t:"S. Simão e S. Judas Tadeu, apóstolos",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sl 138. Mihi autem nimis honorati sunt amici tui Deus... Ef 4,7-13 • Jo 15,17-25",
      l:"/2025/10/28-out-s-simao-e-s-judas-tadeu-apostolos.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA }
  }],
  "10-31":[{
      t:"Vigília de Todos os Santos",
      rito:RITO.SIMPLEX, prec:PREC.VIGILIA_COMUM,
      s:"Sap 3. Judicant sancti gentes et dominantur populis... Ap 5,11-14 • Lc 6,17-23",
      l:"/",
      p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],

  // =========================================================
  // MÊS DE NOVEMBRO
  // =========================================================
  "11-1": [{
      t:"Festa de Todos os Santos (com Oitava)",
      rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE,
      s:"Liturgia. Gaudeamus omnes in Domino... Ap 7,2-12 • Mt 5,1-12",
      l:"/2025/11/01-nov-festa-de-todos-os-S.s.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "11-2": [{
      t:"Comemoração de Todos os Fiéis Defuntos",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"4 Esd 2. Requiem æternam dona eis Domine... 1 Co 15,51-57 • Jo 5,25-29",
      l:"/2025/11/02-nov-dia-de-finados.html",
      p: { cor: COR.PRETA, gloria: false, credo: false, sequencia: SEQ.DIES_IRAE, prefacio: PREF.DEFUNTOS, comum: COMUM.PROPRIA, observacao: "3 Missas permitidas" }
  }],
  "11-3": [{
      t:"Terceiro dia na Oitava de Todos os Santos",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Liturgia. Gaudeamus omnes in Domino... Ap 7,2-12 • Mt 5,1-12",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: "da Festa" }
  }],
  "11-4": [{
      t:"S. Carlos Borromeu, bispo e confessor",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Eclo 45. Statuit ei Dominus testamentum pacis... Eclo 44,16-27; 45,3-20 • Mt 25,14-23",
      l:"/2025/11/04-nov-s-carlos-borromeu-bispo-e.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.CONF_PONT }
  }],
  "11-5": [{
      t:"Quinto dia na Oitava de Todos os Santos",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Liturgia. Gaudeamus omnes in Domino... Ap 7,2-12 • Mt 5,1-12",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: "da Festa" }
  }],
  "11-6": [{
      t:"Sexto dia na Oitava de Todos os Santos",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Liturgia. Gaudeamus omnes in Domino... Ap 7,2-12 • Mt 5,1-12",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: "da Festa" }
  }, {
      t:"S. Leonardo de Limousin, confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Lc 12,35-40",
      l:"/2025/11/06-out-s-leonardo-de-limousin-confessor.html",
      p: { cor: COR.BRANCA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON }
  }],
  "11-7": [{
      t:"Sétimo dia na Oitava de Todos os Santos",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Liturgia. Gaudeamus omnes in Domino... Ap 7,2-12 • Mt 5,1-12",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: "da Festa" }
  }],
  "11-8": [{
      t:"Oitava de Todos os Santos",
      isOitava:true,
      rito:RITO.DUPLEX_MAJ, prec:PREC.DIA_OITAVA_COMUM,
      s:"Liturgia. Gaudeamus omnes in Domino... Ap 7,2-12 • Mt 5,1-12",
      l:"/2025/11/08-nov-ss-quatro-coroados-martires.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: "da Festa" }
  }, {
      t:"Ss. Quatro Coroados, mártires",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 78. Intret in conspectu tuo... Hb 11,33-39 • Mt 10,26-32",
      l:"/2025/11/08-nov-ss-quatro-coroados-martires.html",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_N }
  }],
  "11-9": [{
      t:"Dedicação da Basílica do SSmo. Salvador (Latrão)",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Gn 28. Terribilis est locus iste... Ap 21,2-5 • Lc 19,1-10",
      l:"/2025/11/09-nov-dedicacao-da-basilica-do-ssmo.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.DEDICACAO, comum: COMUM.PROPRIA }
  }, {
      t:"S. Teodoro, mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 63. Lætabitur justus in Domino... 2 Tm 2,8-10; 3,10-12 • Mt 10,26-32",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1 }
  }],
  "11-10":[{
      t:"S. André Avelino, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 31,8-11 • Lc 12,35-40",
      l:"/2025/11/10-nov-s-andre-avelino-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.CONF_NPON }
  }],
  "11-11":[{
      t:"S. Martinho de Tours, bispo e confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 45. Statuit ei Dominus testamentum pacis... Eclo 44,16-27; 45,3-20 • Lc 11,33-36",
      l:"/2025/11/11-nov-s-martinho-bispo-e-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "11-12":[{
      t:"S. Martinho I, papa e mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/2025/11/12-nov-s-martinho-i-papa-e-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "11-13":[{
      t:"S. Diogo, confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 91. Justus ut palma florebit... 1 Co 4,9-14 • Lc 12,32-34",
      l:"/2025/11/13-nov-s-diogo-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "11-14":[{
      t:"S. Josafá, bispo e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Liturgia. Gaudeamus omnes in Domino... Hb 5,1-6 • Jo 10,11-16",
      l:"/2025/11/14-nov-s-josafa-bispo-e-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "11-15":[{
      t:"Santo Alberto Magno, bispo, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l:"/2025/11/15-nov-s-alberto-magno-bispo-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT }
  }],
  "11-16":[{
      t:"Santa Gertrudes, virgem",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 44. Dilexisti justitiam... 2 Co 10,17-18; 11,1-2 • Mt 25,1-13",
      l:"/2025/11/16-nov-s-gertrudes-virgem.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "11-17":[{
      t:"S. Gregório Taumaturgo, bispo e confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Eclo 45. Statuit ei Dominus testamentum pacis... Eclo 44,16-27; 45,3-20 • Mc 11,22-24",
      l:"/2025/11/17-nov-s-gregorio-taumaturgo-bispo-e.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "11-18":[{
      t:"Dedicação das Basílicas de S. Pedro e S. Paulo",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Gn 28. Terribilis est locus iste... Ap 21,2-5 • Lc 19,1-10",
      l:"/2025/11/18-nov-dedicacao-das-basilicas-de-s.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.DEDICACAO, comum: COMUM.PROPRIA }
  }],
  "11-19":[{
      t:"Santa Isabel da Hungria, viúva",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 118. Cognovi Domine quia æquitas judicia tua... Pr 31,10-31 • Mt 13,44-52",
      l:"/2025/11/19-nov-s-isabel-da-hungria-viuva.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "11-20":[{
      t:"S. Félix de Valois, confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 91. Justus ut palma florebit... 1 Co 4,9-14 • Lc 12,32-34",
      l:"/2025/11/20-nov-s-felix-de-valois-confessor.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "11-21":[{
      t:"Apresentação de Nossa Senhora",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Liturgia. Salve sancta parens... Eclo 24,14-16 • Lc 11,27-28",
      l:"/2025/11/21-nov-apresentacao-de-nossa-senhora.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "11-22":[{
      t:"Santa Cecília, virgem e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 118. Loquebar de testimoniis tuis... Eclo 51,13-17 • Mt 25,1-13",
      l:"/2025/11/22-nov-s-cecilia-virgem-e-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "11-23":[{
      t:"S. Clemente I, papa e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Jo 21. Si díligis me... Fl 3,17-21; 4,1-3 • Mt 25,14-23",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"S. Felicidade, mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 36. Salus autem justorum a Domino... Pr 31,10-31 • Mt 12,46-50",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1 }
  }],
  "11-24":[{
      t:"S. João da Cruz, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l:"/2025/11/24-nov-s-joao-da-cruz-confessor-e.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT }
  }, {
      t:"S. Crisógono, mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 63. Lætabitur justus in Domino... 2 Tm 2,8-10; 3,10-12 • Mt 10,26-32",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1 }
  }],
  "11-25":[{
      t:"Santa Catarina de Alexandria, virgem e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 118. Loquebar de testimoniis tuis... Eclo 51,1-8; 12 • Mt 25,1-13",
      l:"/2025/11/25-nov-s-catarina-virgem-e-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "11-26":[{
      t:"S. Silvestre, abade",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 45,1-6 • Mt 19,27-29",
      l:"/2025/11/26-nov-s-silvestre-abade.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.ABBATIS }
  }, {
      t:"S. Pedro de Alexandria, bispo e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 10-11 • Mt 16,13-19",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1_PONT }
  }],
  "11-29":[{
      t:"Vigília de Santo André",
      rito:RITO.SIMPLEX, prec:PREC.VIGILIA_COMUM,
      s:"Mt 4. Dominus secus mare Galilææ... Rm 10,10-18 • Jo 1,35-51",
      l:"/2025/11/29-nov-vigilia-de-s-andre.html",
      p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }, {
      t:"S. Saturnino, mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 20. In virtute tua Domine lætabitur justus... Sb 10,10-14 • Mt 10,34-39",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.MART_1 }
  }],
  "11-30":[{
      t:"Santo André, apóstolo",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Mt 4. Dominus secus mare Galilææ... Rm 10,10-18 • Mt 4,18-22",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA }
  }],

  // =========================================================
  // MÊS DE DEZEMBRO
  // =========================================================
  "12-2": [{
      t:"Santa Bibiana, virgem e mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Sl 118. Me exspectaverunt peccatores... Eclo 51,13-17 • Mt 13,44-52",
      l:"/2024/12/liturgia-diaria-02-dez-s-bibiana-virgem.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "12-3": [{
      t:"S. Francisco Xavier, confessor",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Sl 118. Loquebar de testimoniis tuis... Rm 10,10-18 • Mc 16,15-18",
      l:"/2024/12/liturgia-diaria-03-dez-s-francisco.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "12-4": [{
      t:"S. Pedro Crisólogo, bispo, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l:"/2024/12/liturgia-diaria-04-dez-s-pedro.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT }
  }],
  "12-5": [{
      t:"S. Sabas, abade",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Sl 36. Os justi meditabitur sapientiam... Eclo 45,1-6 • Mt 11,25-30",
      l:"/2025/12/05-dez-s-sabas-abade.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.ABBATIS }
  }],
  "12-6": [{
      t:"S. Nicolau, bispo e confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 45. Statuit ei Dominus testamentum pacis... Hb 13,7-17 • Mt 25,14-23",
      l:"/2024/12/liturgia-diaria-06-dez-s-nicolau-bispo.html",
      p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
 "12-7": [{
      t:"Santo Ambrósio, bispo, confessor e doutor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... 2 Tm 4,1-8 • Mt 5,13-19",
      l:"/2024/12/liturgia-diaria-07-dez-s-ambrosio-bispo.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.COMUM, comum: COMUM.DOCT }
  }, {
      t:"Vigília da Imaculada Conceição",
      rito:RITO.SIMPLEX, prec:PREC.VIGILIA_COMUM,
      s:"Pr 8. Dominus possedit me... Pr 8,22-35 • Mt 1,1-16",
      l:"/",
      p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "12-8": [{
      t:"Imaculada Conceição da B.A. Virgem Maria (com Oitava)",
      rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE,
      s:"Is 61. Gaudens gaudebo in Domino... Pr 8,22-35 • Lc 1,26-28",
      l:"/2024/12/liturgia-diaria-08122024-imaculada.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "12-9": [{
      t:"Segundo dia na Oitava da Imaculada Conceição",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Is 61. Gaudens gaudebo in Domino... Pr 8,22-35 • Lc 1,26-28",
      l:"/2024/12/liturgia-diaria-08122024-imaculada.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: "da Festa" }
  }],
  "12-10":[{
      t:"Terceiro dia na Oitava da Imaculada Conceição",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Is 61. Gaudens gaudebo in Domino... Pr 8,22-35 • Lc 1,26-28",
      l:"/2024/12/liturgia-diaria-08122024-imaculada.html", 
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: "da Festa" }
  }, {
      t:"S. Melquíades, papa e mártir",
      rito:RITO.SIMPLEX, prec:PREC.FESTA_SIMPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/",
      p: { cor: COR.VERMELHA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.SUM_PONT }
  }],
  "12-11":[{
      t:"S. Dâmaso I, papa e confessor",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Jo 21. Si díligis me... 1 Pd 5,1-4; 5,10-11 • Mt 16,13-19",
      l:"/2024/12/liturgia-diaria-11-dez-s-damaso-i-papa.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.SUM_PONT }
  }],
  "12-12":[{
      t:"Quinto dia na Oitava da Imaculada Conceição",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Is 61. Gaudens gaudebo in Domino... Pr 8,22-35 • Lc 1,26-28",
      l:"/2024/12/liturgia-diaria-08122024-imaculada.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: "da Festa" }
  }, {
      t:"Nossa Senhora de Guadalupe",
      rito:RITO.LOCAL, prec:PREC.PRO_ALIQUIBUS_LOCIS,
      s:"Ap 12. Signum magnum apparuit in cælo... Eclo 24,23-31 • Lc 1,39-47",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "12-13":[{
      t:"Santa Luzia, virgem e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Sl 44. Dilexisti justitiam... 2 Co 10,17-18; 11,1-2 • Mt 13,44-52",
      l:"/2024/12/liturgia-diaria-13-dezembro-santa-luzia.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "12-14":[{
      t:"Sétimo dia na Oitava da Imaculada Conceição",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM,
      s:"Is 61. Gaudens gaudebo in Domino... Pr 8,22-35 • Lc 1,26-28",
      l:"/2024/12/liturgia-diaria-08122024-imaculada.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: "da Festa" }
  }],
  "12-15":[{
      t:"Oitava da Imaculada Conceição",
      isOitava:true,
      rito:RITO.DUPLEX_MAJ, prec:PREC.DIA_OITAVA_COMUM,
      s:"Is 61. Gaudens gaudebo in Domino... Pr 8,22-35 • Lc 1,26-28",
      l:"/2024/12/liturgia-diaria-08122024-imaculada.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: "da Festa" }
  }],
  "12-16":[{
      t:"S. Eusébio, bispo e mártir",
      rito:RITO.SEMIDUPLEX, prec:PREC.FESTA_SEMIDUPLEX,
      s:"Dn 3. Sacerdotes Dei benedicite Dominum... 2 Co 1,3-7 • Mt 16,24-27",
      l:"/2024/12/liturgia-diaria-16122024-comemoracao-de.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "12-18":[{
      t:"Expectação do Parto de Nossa Senhora",
      rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ,
      s:"Is 45. Rorate cæli desuper... Is 7,10-15 • Lc 1,26-38",
      l:"/2025/12/18-dez-expectacao-do-parto-de-nossa.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.BVM, comum: COMUM.PROPRIA }
  }],
  "12-20":[{
      t:"Vigília de S. Tomé, apóstolo",
      rito:RITO.SIMPLEX, prec:PREC.VIGILIA_COMUM,
      s:"Sl 51. Ego autem sicut oliva... Ef 2,19-22 • Jo 14,1-7",
      l:"/",
      p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM, comum: COMUM.PROPRIA }
  }],
  "12-21":[{
      t:"S. Tomé, apóstolo",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sl 138. Mihi autem nimis honorati sunt amici tui Deus... Ef 2,19-22 • Jo 20,24-29",
      l:"/2024/12/liturgia-diaria-21-dez-sao-tome-apostolo.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.APOSTOLOS, comum: COMUM.PROPRIA }
  }],
  "12-24":[{
      t:"Vigília do Natal",
      rito:RITO.SEMIDUPLEX, prec:PREC.VIGILIA_MAIOR,
      s:"Ex 16. Hodie scietis quia veniet Dominus... Rm 1,1-6 • Mt 1,18-21",
      l:"/2024/12/liturgia-diaria-24-dez-vigilia-do-natal.html",
      p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.NATAL, comum: COMUM.PROPRIA }
  }],
  "12-25":[{
      t:"Natal de Nosso Senhor Jesus Cristo (com Oitava)",
      rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE,
      s:"Is 9. Puer natus est nobis... Hb 1,1-12 • Jo 1,1-14",
      l:"/2025/12/25-dez-natividade-de-nosso-senhor-jesus.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL, communicantes: "natal", comum: COMUM.PROPRIA, observacao: "Genuflexão no Et incarnatus est; 3 Missas permitidas" }
  }],
  "12-26":[{
      t:"Santo Estêvão, protomártir",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sl 118. Sederunt principes... At 6,8-10; 7,54-59 • Mt 23,34-39",
      l:"/2025/12/26-dez-s-estevao-protomartir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.NATAL, communicantes: "natal", comum: COMUM.PROPRIA }
  }, {
      t:"Comemoração da Oitava do Natal",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_3_ORDEM,
      s:"Is 9. Puer natus est nobis... Hb 1,1-12 • Jo 1,1-14",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL, communicantes: "natal" }
  }],
  "12-27":[{
      t:"S. João, apóstolo e evangelista",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Eclo 15. In medio Ecclesiæ aperuit os ejus... Eclo 15,1-6 • Jo 21,19-24",
      l:"/2024/12/liturgia-diaria-27-dez-sao-joao.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL, communicantes: "natal", comum: COMUM.PROPRIA }
  }, {
      t:"Comemoração da Oitava do Natal",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_3_ORDEM,
      s:"Is 9. Puer natus est nobis... Hb 1,1-12 • Jo 1,1-14",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL, communicantes: "natal" }
  }],
"12-28":[{
      // [LOCKED-RITO] Cor base Roxa (na semana). Fica Vermelho e com Glória só se cair no domingo (via script dinâmico).
      t:"Santos Inocentes, mártires",
      rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE,
      s:"Sl 8. Ex ore infantium Deus... Ap 14,1-5 • Mt 2,13-18",
      l:"/2024/12/liturgia-diaria-28-dez-os-S.s.html",
      p: { cor: COR.ROXA, gloria: false, credo: true, prefacio: PREF.NATAL, communicantes: "natal", comum: COMUM.PROPRIA }
  }, {
      t:"Comemoração da Oitava do Natal",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_3_ORDEM,
      s:"Is 9. Puer natus est nobis... Hb 1,1-12 • Jo 1,1-14",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL, communicantes: "natal" }
  }],
  "12-29":[{
      t:"S. Tomás Becket, bispo e mártir",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Liturgia. Gaudeamus omnes in Domino... Hb 5,1-6 • Jo 10,11-16",
      l:"/2025/12/29-dez-s-tomas-becket-bispo-e-martir.html",
      p: { cor: COR.VERMELHA, gloria: true, credo: true, prefacio: PREF.NATAL, communicantes: "natal", comum: COMUM.PROPRIA }
  }, {
      t:"Comemoração da Oitava do Natal",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_3_ORDEM,
      s:"Is 9. Puer natus est nobis... Hb 1,1-12 • Jo 1,1-14",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL, communicantes: "natal" }
  }],
  "12-30":[{
      t:"Sexto dia na Oitava do Natal",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_3_ORDEM,
      s:"Is 9. Puer natus est nobis... Tt 3,4-7 • Lc 2,15-20",
      l:"/2025/12/30-dez-sexto-dia-da-oitava-de-natal.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL, communicantes: "natal", comum: "da Oitava" }
  }],
  "12-31":[{
      t:"S. Silvestre I, papa e confessor",
      rito:RITO.DUPLEX, prec:PREC.FESTA_DUPLEX,
      s:"Jo 21. Si díligis me... 2 Tm 4,1-8 • Lc 12,35-40",
      l:"/2024/12/liturgia-diaria-31-dez-vii-dia-da.html",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL, communicantes: "natal", comum: COMUM.PROPRIA }
  }, {
      t:"Comemoração da Oitava do Natal",
      rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_3_ORDEM,
      s:"Is 9. Puer natus est nobis... Hb 1,1-12 • Jo 1,1-14",
      l:"/",
      p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL, communicantes: "natal" }
  }],
};

const SANTOS_FIXOS_ORIGINAL = JSON.parse(JSON.stringify(SANTOS_FIXOS));

let cacheDias = new Map();
let cacheDominante = new Map();
let filaTransferencia = [];
let moveis = {};

function prepararMotorLiturgico(anoParaCalcular) {
    anoState.ano = anoParaCalcular;
    Object.keys(SANTOS_FIXOS).forEach(k => { delete SANTOS_FIXOS[k]; });
    Object.keys(SANTOS_FIXOS_ORIGINAL).forEach(k => { SANTOS_FIXOS[k] = structuredClone(SANTOS_FIXOS_ORIGINAL[k]); });
    inicializarEpocas();
    cacheDias.clear(); cacheDominante.clear(); filaTransferencia = []; moveis = {};

    const dataInocentes = new Date(anoState.ano, 11, 28);
    if (SANTOS_FIXOS["12-28"]) {
        const inocentes = SANTOS_FIXOS["12-28"].find(i => i.t.includes("Inocentes"));
        if (inocentes) {
            if (dataInocentes.getDay() === 0) { inocentes.p.gloria = true; inocentes.p.cor = COR.VERMELHA; }
            else { inocentes.p.gloria = false; inocentes.p.cor = COR.ROXA; }
        }
    }

    const chavesFx = Object.keys(SANTOS_FIXOS).sort((a, b) => { const [am, ad] = a.split('-').map(Number); const [bm, bd] = b.split('-').map(Number); return am !== bm ? am - bm : ad - bd; });
    for (const key of chavesFx) {
        const itens = SANTOS_FIXOS[key], [mStr, dStr] = key.split('-');
        const mesNum = parseInt(mStr) - 1, dia = parseInt(dStr), dataObj = new Date(anoState.ano, mesNum, dia);
        if (dataObj.getDay() === 0) {
            const isVigiliaEpifania = (mesNum === 0 && dia === 5);
            const vigilias = itens.filter(i => (i.prec === PREC.VIGILIA_COMUM || i.prec === PREC.VIGILIA_MAIOR) && !isVigiliaEpifania);
            if (vigilias.length > 0) {
                SANTOS_FIXOS[key] = itens.filter(i => !(i.prec === PREC.VIGILIA_COMUM || i.prec === PREC.VIGILIA_MAIOR) || isVigiliaEpifania);
                const dataSabado = new Date(anoState.ano, mesNum, dia - 1), tSabado = dataSabado.getTime();
                if (tSabado !== anoState.epochSabadoSanto && tSabado !== anoState.epochCinzas) {
                    const keySabado = `${dataSabado.getMonth() + 1}-${dataSabado.getDate()}`;
                    if (!SANTOS_FIXOS[keySabado]) SANTOS_FIXOS[keySabado] = [];
                    const vigilias_antecipadas = vigilias.map(v => ({ ...v, p: { ...v.p, observacao_antecipacao: `Antecipada do domingo ${dia}/${String(mesNum + 1).padStart(2,'0')}` } }));
                    SANTOS_FIXOS[keySabado].push(...vigilias_antecipadas);
                }
            }
        }
    }

    if (new Date(anoState.ano, 1, 29).getDate() === 29) {
        if (SANTOS_FIXOS["2-23"]) {
            const vigilias = SANTOS_FIXOS["2-23"].filter(i => i.prec === PREC.VIGILIA_COMUM);
            SANTOS_FIXOS["2-23"] = SANTOS_FIXOS["2-23"].filter(i => i.prec !== PREC.VIGILIA_COMUM);
            if (vigilias.length > 0) SANTOS_FIXOS["2-24"] = [...vigilias, ...(SANTOS_FIXOS["2-24"] || [])];
        }
        if (SANTOS_FIXOS["2-24"]) {
            const matias = SANTOS_FIXOS["2-24"].filter(i => !i.t.includes("Vigília"));
            SANTOS_FIXOS["2-24"] = SANTOS_FIXOS["2-24"].filter(i => i.t.includes("Vigília"));
            if (matias.length > 0) SANTOS_FIXOS["2-25"] = [...(SANTOS_FIXOS["2-25"] || []), ...matias];
        }
        if (SANTOS_FIXOS["2-27"]) { SANTOS_FIXOS["2-28"] = [...(SANTOS_FIXOS["2-28"] || []), ...SANTOS_FIXOS["2-27"]]; delete SANTOS_FIXOS["2-27"]; }
    }

    const dataFinados = new Date(anoState.ano, 10, 2);
    if (SANTOS_FIXOS["11-2"]) {
        const itensNov2 = SANTOS_FIXOS["11-2"], isFinados = i => i.t.includes("Defuntos") || i.t.includes("Finados");
        if (dataFinados.getDay() === 0 || itensNov2.some(i => i.prec >= PREC.FESTA_I_CLASSE)) {
            const itensFinados = itensNov2.filter(isFinados);
            SANTOS_FIXOS["11-2"] = itensNov2.filter(i => !isFinados(i));
            if (itensFinados.length > 0) {
                let diaAlvo = 3; if (new Date(anoState.ano, 10, diaAlvo).getDay() === 0) diaAlvo = 4;
                SANTOS_FIXOS[`11-${diaAlvo}`] = [...itensFinados, ...(SANTOS_FIXOS[`11-${diaAlvo}`] || [])];
            }
        }
    }

    function addM(d, obj) { const k = `${d.getMonth() + 1}-${d.getDate()}`; if (!moveis[k]) moveis[k] = []; if (!obj.tipo) obj.tipo = inferirTipo(obj); moveis[k].push(obj); }
    
    // TODAS AS DATAS MÓVEIS
    addM(dP(-63),{t:"Domingo da Septuagésima", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_II_CLASSE, s:"Sl 17. Circumdederunt me gemitus mortis... 1 Co 9,24-27; 10,1-5 • Mt 20,1-16", l:"/2025/02/liturgia-diaria-16-fev-domingo-da.html", dom:true, p: { cor: COR.ROXA, gloria: false, credo: true, prefacio: PREF.TRINDADE }});
    addM(dP(-56),{t:"Domingo da Sexagésima", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_II_CLASSE, s:"Sl 43. Exsúrge, quare obdórmis, Dómine?... 2 Co 11,19-33; 12,1-9 • Lc 8,4-15", l:"/2025/02/liturgia-diaria-23-fev-domingo-da.html", dom:true, p: { cor: COR.ROXA, gloria: false, credo: true, prefacio: PREF.TRINDADE }});
    addM(dP(-49),{t:"Domingo da Quinquagésima", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_II_CLASSE, s:"Sl 30. Esto mihi in Deum protectórem... 1 Co 13,1-13 • Lc 18,31-43", l:"/2025/03/liturgia-diaria-02-mar-domingo-da.html", dom:true, p: { cor: COR.ROXA, gloria: false, credo: true, prefacio: PREF.TRINDADE }});
    addM(dP(-48),{t:"Segunda-feira da Quinquagésima", prec:PREC.FERIA_COMUM, s:"Sl 30. Esto mihi in Deum protectórem... 1 Co 13,1-13 • Lc 18,31-43", l:"/", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM }});
    addM(dP(-47),{t:"Terça-feira da Quinquagésima", prec:PREC.FERIA_COMUM, s:"Sl 30. Esto mihi in Deum protectórem... 1 Co 13,1-13 • Lc 18,31-43", l:"/", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM }});
    addM(dP(-46),{t:"Quarta-feira de Cinzas", prec:PREC.FERIA_PRIVILEGIADA, s:"Sb 11. Miseréris ómnium, Dómine... Jl 2,12-19 • Mt 6,16-21", l:"/2025/03/liturgia-diaria-05-mar-quarta-feira-de.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA, observacao: "Imposição das Cinzas" }});
    addM(dP(-45),{t:"Quinta-feira depois das Cinzas", prec:PREC.FERIA_MAIOR, s:"Sl 54. Dum clamárem ad Dóminum... Is 38,1-6 • Mt 8,5-13", l:"/2025/03/liturgia-diaria-06-mar-quinta-feira.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-44),{t:"Sexta-feira depois das Cinzas", prec:PREC.FERIA_MAIOR, s:"Sl 29. Audívit Dóminus, et misértus est mihi... Is 58,1-9 • Mt 5,43-48; 6,1-6",l:"/2025/03/liturgia-diaria-07-mar-sexta-feira-da-3.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-43),{t:"Sábado depois das Cinzas", prec:PREC.FERIA_MAIOR, s:"Sl 26. Exáudi, Dómine, vocem meam... Is 58,9-14 • Mc 6,47-56", l:"/2025/03/liturgia-diaria-08-mar-sabado-depois.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-42),{t:"I Domingo da Quaresma", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_I_CLASSE, s:"Sl 90. Invocábit me, et ego exáudiam eum... 2 Co 6,1-10 • Mt 4,1-11", l:"/2025/03/liturgia-diaria-09032025-i-domingo-da.html", dom:true, p: { cor: COR.ROXA, gloria: false, credo: true, prefacio: PREF.QUARESMA }});
    addM(dP(-41),{t:"Segunda-feira da 1ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 122. Sicut óculi servórum... Ez 34,11-16 • Mt 25,31-46", l:"/", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-40),{t:"Terça-feira da 1ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 89. Dómine, refúgium factus es nobis... Is 55,6-11 • Mt 21,10-17", l:"/", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-39),{t:"Quarta-feira das Têmporas da Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 24. Reminíscere miseratiónum tuárum... Ex 24,12-18 | 3 Rs 19,3-8 • Mt 12,38-50", l:"/2025/03/liturgia-diaria-12-mar-quarta-feira-das.html", p: { cor: COR.ROXA, gloria: false, credo: false, flectamus: true, prefacio: PREF.QUARESMA, observacao: "Têmporas" }});
    addM(dP(-38),{t:"Quinta-feira da 1ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 95. Conféssio et pulchritúdo... Ez 18,1-9 • Mt 15,21-28", l:"/2025/03/liturgia-diaria-13-mar-quinta-feira-da.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-37),{t:"Sexta-feira das Têmporas da Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 24. De necessitátibus meis éripe me... Ez 18,20-28 • Jo 5,1-15", l:"/2025/03/liturgia-diaria-14-mar-sexta-feira-das.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA, observacao: "Têmporas" }});
    addM(dP(-36),{t:"Sábado das Têmporas da Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 87. Intret orátio mea... Dt 26,12-19 | Dt 11,22-25 | 2 Mac 1,23-27 | Eclo 36,1-10 | Dn 3,47-51 | 1 Ts 5,14-23 • Mt 17,1-9", l:"/2025/03/liturgia-diaria-15-mar-sabado-das.html", p: { cor: COR.ROXA, gloria: false, credo: false, flectamus: true, prefacio: PREF.QUARESMA, observacao: "Têmporas · 6 Lições" }});
    addM(dP(-35),{t:"II Domingo da Quaresma", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_I_CLASSE, s:"Sl 24. Reminíscere miseratiónum tuárum... 1 Ts 4,1-7 • Mt 17,1-9", l:"/2025/03/liturgia-diaria-16-ii-domingo-da.html", dom:true, p: { cor: COR.ROXA, gloria: false, credo: true, prefacio: PREF.QUARESMA }});
    addM(dP(-34),{t:"Segunda-feira da 2ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 25. Rédime me, Dómine... Dn 9,15-19 • Jo 8,21-29", l:"/2025/03/liturgia-diaria-17-mar-segunda-feira-da.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-33),{t:"Terça-feira da 2ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 26. Tibi dixit cor meum... 3 Rs 17,8-16 • Mt 23,1-12", l:"/2025/03/liturgia-diaria-18-mar-terca-feira-da-2.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-32),{t:"Quarta-feira da 2ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 37. Ne derelínquas me, Dómine... Est 13,8-11; 13,15-17 • Mt 20,17-28", l:"/2026/03/quarta-feira-da-2-semana-da-quaresma.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-31),{t:"Quinta-feira da 2ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 69. Deus, in adjutórium meum inténde... Jr 17,5-10 • Lc 16,19-31", l:"/2025/03/20-mar-quinta-feira-da-2-semana-da.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-30),{t:"Sexta-feira da 2ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 16. Ego autem cum justítia apparébo... Gn 37,6-22 • Mt 21,33-46", l:"/2025/03/21-mar-sexta-feira-da-2-semana-da.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-29),{t:"Sábado da 2ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 18. Lex Dómini irreprehensíbilis... Gn 27,6-40 • Lc 15,11-32", l:"/2025/03/22-mar-sabado-da-2-semana-da-quaresma.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-28),{t:"III Domingo da Quaresma", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_I_CLASSE, s:"Sl 24. Oculi mei semper ad Dóminum... Ef 5,1-9 • Lc 11,14-28", l:"/2025/03/23-mar-ii-domingo-da-quaresma.html", dom:true, p: { cor: COR.ROXA, gloria: false, credo: true, prefacio: PREF.QUARESMA }});
    addM(dP(-27),{t:"Segunda-feira da 3ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 55. In Deo laudábo verbum... 4 Rs 5,1-15 • Lc 4,23-30", l:"/2025/03/24-mar-segunda-feira-da-3-semana-da.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-26),{t:"Terça-feira da 3ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 16. Ego clamávi... 4 Rs 4,1-7 • Mt 18,15-22", l:"/", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-25),{t:"Quarta-feira da 3ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 30. Ego autem in Dómino sperávi... Ex 20,12-24 • Mt 15,1-20", l:"/2025/03/26-mar-quarta-feira-da-3-semana-da.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-24),{t:"Quinta-feira da 3ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 77. Salus pópuli ego sum... Jr 7,1-7 • Lc 4,38-44", l:"/2025/03/27-mar-quinta-feira-da-3-semana-da.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-23),{t:"Sexta-feira da 3ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 85. Fac mecum, Dómine, signum in bonum... Nm 20,1-3; 20,6-13 • Jo 4,5-42", l:"/2025/03/28-mar-sexta-feira-da-3-semana-da.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-22),{t:"Sábado da 3ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 5. Verba mea áuribus pércipe, Dómine... Dn 13,1-9; 15-17; 19-30; 33-62 • Jo 8,1-11", l:"/2025/03/29-sabado-da-3-semana-da-quaresma.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-21),{t:"IV Domingo da Quaresma (Lætare)", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_I_CLASSE, s:"Is 66. Lætáre, Ierúsalem... Gl 4,22-31 • Jo 6,1-15", l:"/2025/03/30-mar-iv-domingo-da-quaresma.html", dom:true, p: { cor: COR.ROSA, gloria: false, credo: true, prefacio: PREF.QUARESMA }});
    addM(dP(-20),{t:"Segunda-feira da 4ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 53. Deus, in nómine tuo salvum me fac... 3 Rs 3,16-28 • Jo 2,13-25", l:"/2025/03/31-segunda-feira-da-4-semana-da-quaresma.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-19),{t:"Terça-feira da 4ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 54. Exáudi, Deus, oratiónem meam... Ex 32,7-14 • Jo 7,14-31", l:"/2025/04/terca-feira-da-4-semana-da-quaresma.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-18),{t:"Quarta-feira da 4ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Ez 36. Cum sanctificátus fúero in vobis... Is 1,16-19 • Jo 9,1-38", l:"/2025/04/quarta-feira-da-4-semana-da-quaresma.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-17),{t:"Quinta-feira da 4ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 104. Lætétur cor quæréntium Dóminum... 4 Rs 4,25-38 • Lc 7,11-16", l:"/2025/04/quinta-feira-da-4-semana-da-quaresma.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-16),{t:"Sexta-feira da 4ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Sl 18. Meditátio cordis mei in conspéctu tuo... 3 Rs 17,17-24 • Jo 11,1-45", l:"/2025/04/sexta-feira-da-4-semana-da-quaresma.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-15),{t:"Sábado da 4ª sem. Quaresma", prec:PREC.FERIA_MAIOR, s:"Is 55. Sitiéntes, veníte ad aquas... Is 49,8-15 • Jo 8,12-20", l:"/2025/04/sabado-da-4-semana-da-quaresma.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.QUARESMA }});
    addM(dP(-14),{t:"I Domingo da Paixão", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_I_CLASSE, s:"Sl 42. Iúdica me, Deus... Hb 9,11-15 • Jo 8,46-59", l:"/2025/04/i-domingo-da-paixao.html", dom:true, p: { cor: COR.ROXA, gloria: false, credo: true, prefacio: PREF.CRUZ }});
    addM(dP(-13),{t:"Segunda-feira da sem. da Paixão", prec:PREC.FERIA_MAIOR, s:"Sl 55. Miserére mihi, Dómine... Jn 3,1-10 • Jo 7,32-39", l:"/2025/04/segunda-feira-da-semana-da-paixao.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.CRUZ }});
    addM(dP(-12),{t:"Terça-feira da sem. da Paixão", prec:PREC.FERIA_MAIOR, s:"Sl 26. Exspécta Dóminum, viríliter age... Dn 14,27-42 • Jo 7,1-13", l:"/2025/04/terca-feira-da-semana-da-paixao.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.CRUZ }});
    addM(dP(-11),{t:"Quarta-feira da sem. da Paixão", prec:PREC.FERIA_MAIOR, s:"Sl 17. Liberátor meus de géntibus iracúndis... Lv 19,1-2; 19,11-19; 19,25 • Jo 10,22-38", l:"/2025/04/quarta-feira-da-semana-da-paixao.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.CRUZ }});
    addM(dP(-10),{t:"Quinta-feira da sem. da Paixão", prec:PREC.FERIA_MAIOR, s:"Dn 3. Omnia quæ fecísti nobis, Dómine... Dn 3,25; 34-45 • Lc 7,36-50", l:"/2025/04/quinta-feira-da-semana-da-paixao.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.CRUZ }});
    addM(dP(-9), {t:"Sexta-feira da sem. da Paixão", prec:PREC.FERIA_MAIOR, s:"Sl 30. Miserére mihi, Dómine, quóniam tríbulor... Jr 17,13-18 • Jo 11,47-54", l:"/2025/04/sexta-feira-da-semana-da-paixao.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.CRUZ }});
    addM(dP(-9), {t:"As Sete Dores de Nossa Senhora", rito:RITO.DUPLEX_MAJ, prec:PREC.FESTA_DUPLEX_MAJ, s:"Jo 19. Stabant juxta crucem Jesu... Jt 13,22-25 • Jo 19,25-27", l:"/festas-moveis/sexta-feira-das-dores-de-maria.html", p: { cor: COR.BRANCA, gloria: true, credo: true, sequencia: SEQ.STABAT, prefacio: PREF.BVM, observacao: "BVM na Transfixão" }});
    addM(dP(-8), {t:"Sábado da sem. da Paixão", prec:PREC.FERIA_MAIOR, s:"Sl 30. Miserére mihi, Dómine, quóniam tríbulor... Jr 18,18-23 • Jo 12,10-36", l:"/2025/04/sabado-da-semana-da-paixao.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.CRUZ }});
    addM(dP(-7), {t:"Domingo de Ramos e II da Paixão", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_I_CLASSE, s:"Sl 21. Dómine, ne longe fácias auxílium tuum... Fl 2,5-11 • Mt 26,36-75; 27,1-60", l:"/2025/04/ii-domingo-da-paixao-domingo-de-ramos.html", dom:true, p: { cor: COR.ROXA, gloria: false, credo: true, prefacio: PREF.CRUZ, observacao: "Bênção dos Ramos e Procissão" }});
    addM(dP(-6), {t:"Segunda-feira Santa", prec:PREC.FERIA_PRIVILEGIADA, s:"Sl 34. Iúdica, Dómine, nocéntes me... Is 50,5-10 • Jo 12,1-9", l:"/2025/04/segunda-feira-santa.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.CRUZ }});
    addM(dP(-5), {t:"Terça-feira Santa", prec:PREC.FERIA_PRIVILEGIADA, s:"Gl 6. Nos autem gloriári opórtet... Jr 11,18-20 • Mc 14,1-72; 15,1-46", l:"/2025/04/terca-feira-santa.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.CRUZ, observacao: "Paixão (S. Marcos)" }});
    addM(dP(-4), {t:"Quarta-feira Santa", prec:PREC.FERIA_PRIVILEGIADA, s:"Fp 2. In nómine Dómini omne genu flectátur... Is 62,11; 63,1-7 | Is 53,1-12 • Lc 22,39-71; 23,1-53", l:"/2025/04/quarta-feira-santa.html", p: { cor: COR.ROXA, gloria: false, credo: false, flectamus: true, prefacio: PREF.CRUZ, observacao: "Paixão (S. Lucas)" }});
    addM(dP(-3), {t:"Quinta-feira Santa — In Coena Domini", rito:RITO.DUPLEX_I, prec:PREC.FERIA_PRIVILEGIADA, s:"Gl 6. Nos autem gloriári opórtet... 1 Co 11,20-32 • Jo 13,1-15", l:"/2025/04/quinta-feira-santa-na-ceia-do-senhor.html", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.CRUZ, communicantes: "quintafeira", hancIgitur: true, observacao: "Gl. c/ sinos · Trato · Ite sem bênção" }});
    addM(dP(-2), {t:"Sexta-feira Santa", rito:RITO.DUPLEX_I, prec:PREC.FERIA_PRIVILEGIADA, s:"[Ação Litúrgica]... Os 6,1-6 | Ex 12,1-11 • Jo 18,1-40; 19,1-42", l:"/2025/04/sexta-feira-da-paixao-e-morte-do-senhor.html", p: { cor: COR.PRETA, gloria: false, credo: false, prefacio: PREF.CRUZ, observacao: "Missa dos Pré-Santificados · Paixão (S. João) · Adoração da Cruz" }});
    addM(dP(-1), {t:"Sábado Santo — Vigília Pascal", rito:RITO.SEMIDUPLEX, prec:PREC.FERIA_PRIVILEGIADA, s:"[Fogo Novo, Profecias e Litanias]... Cl 3,1-4 • Mt 28,1-7", l:"/2025/04/sabado-santo-vigilia-pascal.html", p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.PASCAL, communicantes: "pascal", hancIgitur: true, observacao: "Fogo Novo · 12 Profecias · Bênção da Pia · Litanias · Gl. c/ sinos · Ite c/ duplo Aleluia" }});
    addM(dP(0),  {t:"Domingo da Ressurreição (com Oitava)", rito:RITO.DUPLEX_I, prec:PREC.DOMINGO_I_CLASSE, s:"Sl 138. Resurrexi et adhuc tecum sum... 1 Co 5,7-8 • Mc 16,1-7", l:"/2025/04/domingo-de-pascoa.html", dom:true, p: { cor: COR.BRANCA, gloria: true, credo: true, sequencia: SEQ.VICTIMAE, prefacio: PREF.PASCAL, hancIgitur: true, communicantes: "pascal", observacao: "Ite com duplo Aleluia" }});
    addM(dP(1),  {t:"Segunda-feira da Oitava da Páscoa", rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE, s:"Ex 13. Introduxit vos Dominus in terram... At 10,37-43 • Lc 24,13-35", l:"/2025/04/segunda-feira-de-pascoa.html", p: { cor: COR.BRANCA, gloria: true, credo: true, sequencia: SEQ.VICTIMAE, prefacio: PREF.PASCAL, hancIgitur: true, communicantes: "pascal", observacao: "Ite com duplo Aleluia" }});
    addM(dP(2),  {t:"Terça-feira da Oitava da Páscoa", rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE, s:"Eclo 15. Aqua sapientiæ potavit eos... At 13,16; 26-33 • Lc 24,36-47", l:"/2025/04/3a-feira-de-pascoa.html", p: { cor: COR.BRANCA, gloria: true, credo: true, sequencia: SEQ.VICTIMAE, prefacio: PREF.PASCAL, hancIgitur: true, communicantes: "pascal", observacao: "Ite com duplo Aleluia" }});
    addM(dP(3),  {t:"Quarta-feira da Oitava da Páscoa", rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_1_ORDEM, s:"Mt 25. Venite benedicti Patris mei... At 3,13-15; 17-19 • Jo 21,1-14", l:"/2025/04/4a-feira-de-pascoa.html", p: { cor: COR.BRANCA, gloria: true, credo: true, sequencia: SEQ.VICTIMAE, prefacio: PREF.PASCAL, hancIgitur: true, communicantes: "pascal", observacao: "Ite com duplo Aleluia" }});
    addM(dP(4),  {t:"Quinta-feira da Oitava da Páscoa", rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_1_ORDEM, s:"Sb 10. Victricem manum tuam... At 8,26-40 • Jo 20,11-18", l:"/2025/04/5a-feira-de-pascoa.html", p: { cor: COR.BRANCA, gloria: true, credo: true, sequencia: SEQ.VICTIMAE, prefacio: PREF.PASCAL, hancIgitur: true, communicantes: "pascal", observacao: "Ite com duplo Aleluia" }});
    addM(dP(5),  {t:"Sexta-feira da Oitava da Páscoa", rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_1_ORDEM, s:"Sl 77. Eduxit eos Dominus in spe... 1 Pd 3,18-22 • Mt 28,16-20", l:"/2025/04/6a-feira-de-pascoa.html", p: { cor: COR.BRANCA, gloria: true, credo: true, sequencia: SEQ.VICTIMAE, prefacio: PREF.PASCAL, hancIgitur: true, communicantes: "pascal", observacao: "Ite com duplo Aleluia" }});
    addM(dP(6),  {t:"Sábado in Albis", rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_1_ORDEM, s:"Sl 104. Eduxit Dominus populum suum... 1 Pd 2,1-10 • Jo 20,1-9", l:"/2025/04/sabado-in-albis.html", p: { cor: COR.BRANCA, gloria: true, credo: true, sequencia: SEQ.VICTIMAE, prefacio: PREF.PASCAL, hancIgitur: true, communicantes: "pascal", observacao: "Ite com duplo Aleluia" }});
    addM(dP(7),  {t:"Domingo in Albis (I depois da Páscoa)", rito:RITO.DUPLEX_MAJ, prec:PREC.DOMINGO_I_CLASSE, s:"1 Pd 2. Quasi modo geniti infantes... 1 Jo 5,4-10 • Jo 20,19-31", l:"/2025/04/domingo-in-albis.html", dom:true, p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.PASCAL }});
    const nomesDP = {2:"II", 3:"III", 4:"IV", 5:"V"};
    const linksDP = {2:"/2025/05/ii-domingo-depois-da-pascoa.html", 3:"/2025/05/iii-domingo-depois-da-pascoa.html", 4:"/2025/05/iv-domingo-depois-da-pascoa.html", 5:"/2025/05/v-domindo-depois-da-pascoa.html"};
    const introitDP = {2:"Sl 32. Misericordia Domini plena est terra", 3:"Sl 65. Jubilate Deo omnis terra", 4:"Sl 97. Cantate Domino canticum novum", 5:"Is 48. Vocem jucunditatis annuntiate"};
    const leiturasDP = {2:"1 Pd 2,21-25 • Jo 10,11-16", 3:"1 Pd 2,11-19 • Jo 16,16-22", 4:"Tg 1,17-21 • Jo 16,5-14", 5:"Tg 1,22-27 • Jo 16,23-30"};
    for (let i = 2; i <= 5; i++) addM(dP(i * 7), {t:`${nomesDP[i]} Domingo depois da Páscoa`, rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_COMUM, s:introitDP[i] + "... " + leiturasDP[i], l:linksDP[i], dom:true, p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.PASCAL }});
    addM(dP(17), {t:"Patrocínio de S. José (com Oitava)", rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE, s:"Sl 32. Adjutor, et protector noster est Dominus... Gn 49,22-26 • Lc 3,21-23", l:"/2026/04/patrocinio-de-s-jose-protecao-universal.html", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.SAO_JOSE }});
    [18,19,20,21,22,23].forEach(n => addM(dP(n), {t:"Na Oitava do Patrocínio de S. José", rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM, s:"Sl 32. Adjutor, et protector noster est Dominus... Gn 49,22-26 • Lc 3,21-23", l:"/", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.SAO_JOSE }}));
    addM(dP(24), {t:"Dia Oitavo do Patrocínio de S. José", isOitava:true, rito:RITO.DUPLEX_MAJ, prec:PREC.DIA_OITAVA_COMUM, s:"Sl 32. Adjutor, et protector noster est Dominus... Gn 49,22-26 • Lc 3,21-23", l:"/", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.SAO_JOSE }});
    addM(dP(36), {t:"Litanias Menores (Rogações)", isLitania: true, prec:PREC.FERIA_MAIOR, s:"Sl 17. Exaudivit de templo sancto suo... Tg 5,16-20 • Lc 11,5-13", l:"/2026/05/litanias-menores-dias-de-rogacoes.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.PASCAL, communicantes: "pascal", observacao: "Litanias na Procissão" }});
    addM(dP(37), {t:"Litanias Menores (Rogações)", isLitania: true, prec:PREC.FERIA_MAIOR, s:"Sl 17. Exaudivit de templo sancto suo... Tg 5,16-20 • Lc 11,5-13", l:"/2026/05/litanias-menores-dias-de-rogacoes.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.PASCAL, communicantes: "pascal", observacao: "Litanias na Procissão" }});
    addM(dP(38), {t:"Vigília da Ascensão", isVigAscensao: true, rito:RITO.SEMIDUPLEX, prec:PREC.VIGILIA_COMUM, s:"Is 48. Vocem jucunditatis annuntiate... Ef 4,7-13 • Jo 17,1-11", l:"/2025/05/28-maio-vigilia-da-ascensao-de-nosso.html", p: { cor: COR.BRANCA, gloria: false, credo: false, prefacio: PREF.PASCAL, communicantes: "pascal" }});
    addM(dP(38), {t:"Litanias Menores (Rogações)", isLitania: true, prec:PREC.FERIA_MAIOR, s:"Sl 17. Exaudivit de templo sancto suo... Tg 5,16-20 • Lc 11,5-13", l:"/2026/05/litanias-menores-dias-de-rogacoes.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.PASCAL, communicantes: "pascal", observacao: "Litanias na Procissão" }});
    addM(dP(39), {t:"Ascensão de Nosso Senhor Jesus Cristo (com Oitava)", rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE, s:"At 1. Viri Galilæi quid admiramini... At 1,1-11 • Mc 16,14-20", l:"/2025/05/29-maio-ascensao-de-nosso-senhor-jesus.html", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.ASCENSAO, communicantes: "ascensao" }});
    [40, 41, 43, 44, 45].forEach(n => addM(dP(n), {t:"Na Oitava da Ascensão", rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_3_ORDEM, s:"At 1. Viri Galilæi quid admiramini... At 1,1-11 • Mc 16,14-20", l:"/2026/05/oitava-da-ascensao-gloria-celeste-e.html", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.ASCENSAO, communicantes: "ascensao" }}));
    addM(dP(42), {t:"Domingo dentro da Oitava da Ascensão", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_COMUM, s:"Sl 26. Exaudi Domine vocem meam... 1 Pd 4,7-11 • Jo 15,26-27; 16,1-4", l:"/2025/06/01-junho-domingo-depois-da-ascensao.html", dom:true, p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.ASCENSAO, communicantes: "ascensao" }});
    addM(dP(46), {t:"Dia da Oitava da Ascensão", isOitava:true, rito:RITO.DUPLEX_MAJ, prec:PREC.DIA_OITAVA_COMUM, s:"At 1. Viri Galilæi quid admiramini... At 1,1-11 • Mc 16,14-20", l:"/2026/05/oitava-da-ascensao-gloria-celeste-e.html", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.ASCENSAO, communicantes: "ascensao" }});
    addM(dP(48), {t:"Vigília de Pentecostes", prec:PREC.VIGILIA_MAIOR, s:"[Missa sem Intróito]... At 19,1-8 • Jo 14,15-21", l:"/2025/06/07-junho-vigilia-de-pentecostes.html", p: { cor: COR.ROXA, gloria: true, credo: false, prefacio: PREF.PENTECOSTES, communicantes: "pentecostes", hancIgitur: true, observacao: "6 Profecias · Bênção da Pia · Litanias · Glória (após Litanias)" }});
    addM(dP(49), {t:"Domingo de Pentecostes (com Oitava)", rito:RITO.DUPLEX_I, prec:PREC.DOMINGO_I_CLASSE, s:"Sb 1. Spiritus Domini replevit orbem terrarum... At 2,1-11 • Jo 14,23-31", l:"/2025/06/08-junho-domingo-de-pentecostes.html", dom:true, p: { cor: COR.VERMELHA, gloria: true, credo: true, sequencia: SEQ.VENI, prefacio: PREF.PENTECOSTES, communicantes: "pentecostes", hancIgitur: true }});
    addM(dP(50), {t:"Segunda-feira da Oitava de Pentecostes", rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE, s:"Sl 80. Cibavit eos ex adipe frumenti... At 10,42-48 • Jo 3,16-21", l:"/2025/06/09-junho-2a-feira-de-pentecostes.html", p: { cor: COR.VERMELHA, gloria: true, credo: true, sequencia: SEQ.VENI, prefacio: PREF.PENTECOSTES, communicantes: "pentecostes", hancIgitur: true }});
    addM(dP(51), {t:"Terça-feira da Oitava de Pentecostes", rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE, s:"4 Esd 2. Accipite jucunditatem gloriæ vestræ... At 8,14-17 • Jo 10,1-10", l:"/2025/06/10-junho-3a-feira-de-pentecostes.html", p: { cor: COR.VERMELHA, gloria: true, credo: true, sequencia: SEQ.VENI, prefacio: PREF.PENTECOSTES, communicantes: "pentecostes", hancIgitur: true }});
    addM(dP(52), {t:"Quarta-feira das Têmporas de Pentecostes", rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_1_ORDEM, s:"Sl 67. Deus dum egredereris coram populo tuo... At 2,14-21 | At 5,12-16 • Jo 6,44-52", l:"/2025/06/11-junho-4a-feira-das-temporas-de.html", p: { cor: COR.VERMELHA, gloria: true, credo: true, sequencia: SEQ.VENI, prefacio: PREF.PENTECOSTES, communicantes: "pentecostes", hancIgitur: true, observacao: "Têmporas" }});
    addM(dP(53), {t:"Quinta-feira da Oitava de Pentecostes", rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_1_ORDEM, s:"Sb 1. Spiritus Domini replevit orbem terrarum... At 8,5-8; 8,14-17 • Lc 9,1-6", l:"/2025/06/12-junho-5a-feira-de-pentecostes.html", p: { cor: COR.VERMELHA, gloria: true, credo: true, sequencia: SEQ.VENI, prefacio: PREF.PENTECOSTES, communicantes: "pentecostes", hancIgitur: true }});
    addM(dP(54), {t:"Sexta-feira das Têmporas de Pentecostes", rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_1_ORDEM, s:"Sl 70. Repleatur os meum laude tua... Jl 2,23-24; 2,26-27 • Lc 5,17-26", l:"/2025/06/13junho-6a-feira-das-temporas-de.html", p: { cor: COR.VERMELHA, gloria: true, credo: true, sequencia: SEQ.VENI, prefacio: PREF.PENTECOSTES, communicantes: "pentecostes", hancIgitur: true, observacao: "Têmporas" }});
    addM(dP(55), {t:"Sábado das Têmporas de Pentecostes", rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_1_ORDEM, s:"Rm 5. Caritas Dei diffusa est in cordibus nostris... Jl 2,28-32 | Lv 23,9-11; 15-17; 21 | Dt 26,1-11 | Lv 26,3-12 | Dn 3,47-51 | Rm 5,1-5 • Lc 4,38-44", l:"/2025/06/14-junho-sabado-das-temporas-de.html", p: { cor: COR.VERMELHA, gloria: true, credo: true, sequencia: SEQ.VENI, prefacio: PREF.PENTECOSTES, communicantes: "pentecostes", hancIgitur: true, observacao: "Têmporas · 6 Lições" }});
    addM(dP(56), {t:"Festa da Santíssima Trindade", rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE, s:"Tb 12. Benedicta sit sancta Trinitas... Rm 11,33-36 • Mt 28,18-20", l:"/2025/06/15-junho-festa-da-santissima-trindade.html", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.TRINDADE }});
    addM(dP(56), {t:"I Domingo depois de Pentecostes", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_COMUM, s:"Sl 12. Dómine, in tua misericórdia sperávi... 1 Jo 4,8-21 • Lc 6,36-42", l:"/2025/06/15-junho-i-domingo-depois-de-pentecostes.html", dom:true, p: { cor: COR.VERDE, gloria: true, credo: true, prefacio: PREF.TRINDADE }});
    addM(dP(60), {t:"Festa de Corpus Christi (com Oitava)", rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE, s:"Sl 80. Cibavit eos ex adipe frumenti... 1 Co 11,23-29 • Jo 6,55-58", l:"/2025/06/19-junho-festa-de-corpus-christi.html", p: { cor: COR.BRANCA, gloria: true, credo: true, sequencia: SEQ.LAUDA, prefacio: PREF.NATAL }});
    [61, 62, 64, 65, 66].forEach(n => addM(dP(n), {t:"Na Oitava de Corpus Christi", rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_2_ORDEM, s:"Sl 80. Cibavit eos ex adipe frumenti... 1 Co 11,23-29 • Jo 6,55-58", l:"/2025/06/19-junho-festa-de-corpus-christi.html", p: { cor: COR.BRANCA, gloria: true, credo: true, sequencia: SEQ.LAUDA, prefacio: PREF.NATAL }}));
    addM(dP(63), {t:"2º Domingo depois de Pentecostes (na Oitava de Corpus Christi)", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_COMUM, s:"Sl 17. Factus est Dominus protector meus... 1 Jo 3,13-18 • Lc 14,16-24", l:"/2025/06/22-junho-ii-domingo-de-pentecostes.html", dom:true, p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL }});
    addM(dP(67), {t:"Dia da Oitava de Corpus Christi", isOitava:true, rito:RITO.DUPLEX_MAJ, prec:PREC.DIA_OITAVA_COMUM, s:"Sl 80. Cibavit eos ex adipe frumenti... 1 Co 11,23-29 • Jo 6,55-58", l:"/2025/06/19-junho-festa-de-corpus-christi.html", p: { cor: COR.BRANCA, gloria: true, credo: true, sequencia: SEQ.LAUDA, prefacio: PREF.NATAL }});
    addM(dP(68), {t:"Festa do Sagrado Coração de Jesus (com Oitava)", rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE, s:"Sl 32. Cogitationes Cordis ejus... Ef 3,8-12; 14-19 • Jo 19,31-37", l:"/2025/06/27-junho-festa-do-sagrado-coracao-de.html", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.CORACAO }});
    [69, 71, 72, 73, 74].forEach(n => addM(dP(n), {t:"Na Oitava do Sagrado Coração", rito:RITO.SEMIDUPLEX, prec:PREC.INFRA_OCTAVAM_PRIV_3_ORDEM, s:"Sl 32. Cogitationes Cordis ejus... Ef 3,8-12; 14-19 • Jo 19,31-37", l:"/2025/06/27-junho-festa-do-sagrado-coracao-de.html", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.CORACAO }}));
    addM(dP(70), {t:"3º Domingo depois de Pentecostes (na Oitava do S. Coração)", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_COMUM, s:"Sl 24. Réspice in me et miserére mei... 1 Pd 5,6-11 • Lc 15,1-10", l:"/2026/06/terceiro-domingo-depois-de-pentecostes.html", dom:true, p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.CORACAO }});
    addM(dP(75), {t:"Dia da Oitava do Sagrado Coração", isOitava:true, rito:RITO.DUPLEX_MAJ, prec:PREC.DIA_OITAVA_COMUM, s:"Sl 32. Cogitationes Cordis ejus... Ef 3,8-12; 14-19 • Jo 19,31-37", l:"/2025/06/27-junho-festa-do-sagrado-coracao-de.html", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.CORACAO }});

    const linksP = {"IV":"/2025/07/06-julho-iv-domingo-depois-de.html", "V":"/2025/07/13-julho-v-domingo-depois-de-pentecostes.html", "VI":"/2025/07/20-julho-vi-domingo-depois-de.html", "VII":"/2025/07/27-julho-vii-domingo-depois-de.html", "XI":"/2025/08/03-ago-xi-domingo-depois-de-pentecostes.html", "XII":"/2025/08/10-ago-xii-domingo-depois-de-pentecostes.html", "XIII":"/2025/08/17-ago-xiii-domingo-depois-de-pentecostes.html", "XIV":"/2025/08/24-ago-xiv-domingo-depois-de-pentecostes.html", "XV":"/2025/08/31-ago-xv-domingo-depois-de-pentecostes.html", "XVI":"/2025/09/28-set-xvi-domingo-depois-de-pentecostes.html", "XVII":"/2025/10/05-out-xvii-domingo-depois-de.html", "XIX":"/2025/10/19-out-xix-domingo-depois-de-pentecostes.html"};
    const leiturasP = {"IV": "Rm 8,18-23 • Lc 5,1-11", "V": "1 Pd 3,8-15 • Mt 5,20-24", "VI": "Rm 6,3-11 • Mc 8,1-9", "VII": "Rm 6,19-23 • Mt 7,15-21", "VIII": "Rm 8,12-17 • Lc 16,1-9", "IX": "1 Co 10,6-13 • Lc 19,41-47", "X": "1 Co 12,2-11 • Lc 18,9-14", "XI": "1 Co 15,1-10 • Mc 7,31-37", "XII": "2 Co 3,4-9 • Lc 10,23-37", "XIII": "Gl 3,16-22 • Lc 17,11-19", "XIV": "Gl 5,16-24 • Mt 6,24-33", "XV": "Gl 5,25-26; 6,1-10 • Lc 7,11-16", "XVI": "Ef 3,13-21 • Lc 14,1-11", "XVII": "Ef 4,1-6 • Mt 22,34-46", "XVIII": "1 Co 1,4-8 • Mt 9,1-8", "XIX": "Ef 4,23-28 • Mt 22,1-14", "XX": "Ef 5,15-21 • Jo 4,46-53", "XXI": "Ef 6,10-17 • Mt 18,23-35", "XXII": "Fp 1,6-11 • Mt 22,15-21", "XXIII": "Fp 3,17-21; 4,1-3 • Mt 9,18-26"};
    const leiturasRetomadasEpi = ["Rm 12,16-21 • Mt 8,1-13", "Rm 13,8-10 • Mt 8,23-27", "Cl 3,12-17 • Mt 13,24-30", "1 Ts 1,2-10 • Mt 13,31-35"];
    const dom23Time = dP(56 + 22 * 7).getTime();
    const qtdDomingosRetomados = Math.max(0, Math.floor((anoState.ultimDom.getTime() - dom23Time) / (7 * 86400000)) - 1);
    let indiceRetomada = 4 - qtdDomingosRetomados;

    const domingosPentecostes = [{n: "IV", d: 3}, {n: "V", d: 4}, {n: "VI", d: 5}, {n: "VII", d: 6}, {n: "VIII", d: 7}, {n: "IX", d: 8}, {n: "X", d: 9}, {n: "XI", d: 10}, {n: "XII", d: 11}, {n: "XIII", d: 12}, {n: "XIV", d: 13}, {n: "XV", d: 14}, {n: "XVI", d: 15}, {n: "XVII", d: 16}, {n: "XVIII", d: 17}, {n: "XIX", d: 18}, {n: "XX", d: 19}, {n: "XXI", d: 20}, {n: "XXII", d: 21}, {n: "XXIII", d: 22}, {n: "XXIV", d: 23}, {n: "XXV", d: 24}, {n: "XXVI", d: 25}, {n: "XXVII", d: 26}, {n: "XXVIII", d: 27}];
    for (const dom of domingosPentecostes) {
        const domP = dP(56 + dom.d * 7);
        if (domP.getTime() >= anoState.ultimDom.getTime() || domP.getTime() === anoState.cristoRei.getTime()) break;
        let leituraDia = leiturasP[dom.n];
        if (dom.d >= 22 && indiceRetomada < 4) { leituraDia = leiturasRetomadasEpi[indiceRetomada]; indiceRetomada++; }
        else if (!leituraDia) leituraDia = "Cl 1,9-14 • Mt 24,15-35";
        addM(domP, {t:`${dom.n} Domingo depois de Pentecostes`, rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_COMUM, s:(introitosPentecostesMap[dom.n] || "") + "... " + leituraDia, l:linksP[dom.n] || "/", dom:true, p: { cor: COR.VERDE, gloria: true, credo: true, prefacio: PREF.TRINDADE }});
    }

    addM(anoState.cristoRei, {t:"Festa do Cristo Rei", rito:RITO.DUPLEX_I, prec:PREC.FESTA_I_CLASSE, s:"Ap 5. Dignus est Agnus qui occisus est... Cl 1,12-20 • Jo 18,33-37", l:"/2025/10/26-out-festa-de-cristo-rei.html", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.CRISTO_REI }});

    let domIIEpifania = new Date(anoState.ano, 0, 14);
    while (domIIEpifania.getDay() !== 0) domIIEpifania.setDate(domIIEpifania.getDate() + 1);
    let domAtualEpi = new Date(domIIEpifania), numDomEpi = 2;
    const numRomanoEpi = {2:"II", 3:"III", 4:"IV", 5:"V", 6:"VI"};
    const introitosEpi = {2: "Sl 65. Omnis terra adoret te, Deus", 3: "Sl 96. Adorate Deum, omnes Angeli ejus", 4: "Sl 96. Adorate Deum, omnes Angeli ejus", 5: "Sl 96. Adorate Deum, omnes Angeli ejus", 6: "Sl 96. Adorate Deum, omnes Angeli ejus"};
    const leiturasEpi = {2: "Rm 12,6-16 • Jo 2,1-11", 3: "Rm 12,16-21 • Mt 8,1-13", 4: "Rm 13,8-10 • Mt 8,23-27", 5: "Cl 3,12-17 • Mt 13,24-30", 6: "1 Ts 1,2-10 • Mt 13,31-35"};
    while (domAtualEpi < anoState.epochSeptuagesima && numDomEpi <= 6) {
        addM(new Date(domAtualEpi), {t: `${numRomanoEpi[numDomEpi]} Domingo depois da Epifania`, rito: RITO.SEMIDUPLEX, prec: PREC.DOMINGO_COMUM, s: introitosEpi[numDomEpi] + "... " + leiturasEpi[numDomEpi], l: "/", dom: true, p: { cor: COR.VERDE, gloria: true, credo: true, prefacio: PREF.TRINDADE }});
        domAtualEpi.setDate(domAtualEpi.getDate() + 7); numDomEpi++;
    }

    addM(anoState.iAdv, {t:"I Domingo do Advento", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_I_CLASSE, s:"Sl 24. Ad te levavi animam meam... Rm 13,11-14 • Lc 21,25-33", l:"/2024/12/liturgia-diaria-i-domingo-do-advento.html", dom:true, p: { cor: COR.ROXA, gloria: false, credo: true, prefacio: PREF.TRINDADE }});
    addM(anoState.iiAdv, {t:"II Domingo do Advento", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_II_CLASSE, s:"Is 30. Populus Sion... Rm 15,4-13 • Mt 11,2-10", l:"/2025/12/07-dez-ii-domingo-do-advento.html", dom:true, p: { cor: COR.ROXA, gloria: false, credo: true, prefacio: PREF.TRINDADE }});
    addM(anoState.iiiAdv, {t:"III Domingo do Advento (Gaudete)", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_II_CLASSE, s:"Fl 4. Gaudete in Domino semper... Fl 4,4-7 • Jo 1,19-28", l:"/2024/12/liturgia-diaria-iii-domingo-do-advento.html", dom:true, p: { cor: COR.ROSA, gloria: false, credo: true, prefacio: PREF.TRINDADE }});
    addM(anoState.ivAdv, {t:"IV Domingo do Advento", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_II_CLASSE, s:"Is 45. Rorate cæli desuper... 1 Co 4,1-5 • Lc 3,1-6", l:"/2024/12/liturgia-diaria-22-dez.html", dom:true, p: { cor: COR.ROXA, gloria: false, credo: true, prefacio: PREF.TRINDADE }});

    if (anoState.epochQuaSet) {
        addM(new Date(anoState.epochQuaSet), {t:"Quarta-feira das Têmporas de Setembro", prec:PREC.FERIA_MAIOR, s:"Sl 80. Exsultate Deo, adjutori nostro... Am 9,13-15; Ed 8,1-10 • Mc 9,16-28", l:"/", p: { cor: COR.ROXA, gloria: false, credo: false, flectamus: true, prefacio: PREF.COMUM, observacao: "Têmporas" }});
        addM(new Date(anoState.epochSexSet), {t:"Sexta-feira das Têmporas de Setembro", prec:PREC.FERIA_MAIOR, s:"Sl 104. Lætetur cor quærentium Dominum... Os 14,2-10 • Lc 7,36-50", l:"/", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM, observacao: "Têmporas" }});
        addM(new Date(anoState.epochSabSet), {t:"Sábado das Têmporas de Setembro", prec:PREC.FERIA_MAIOR, s:"Sl 94. Venite, adoremus Deum... Lv 23,26-32; Hb 9,2-12 • Lc 13,6-17", l:"/", p: { cor: COR.ROXA, gloria: false, credo: false, flectamus: true, prefacio: PREF.COMUM, observacao: "Têmporas · 6 Lições" }});
    }
    addM(new Date(anoState.epochQuaAdv), {t:"Quarta-feira das Têmporas do Advento", prec:PREC.FERIA_MAIOR, s:"Is 45. Rorate cæli desuper... Is 7,10-15 • Lc 1,26-38", l:"/2025/12/17-dez-quarta-feira-das-temporas-do.html", p: { cor: COR.ROXA, gloria: false, credo: false, flectamus: true, prefacio: PREF.COMUM, observacao: "Têmporas" }});
    addM(new Date(anoState.epochSexAdv), {t:"Sexta-feira das Têmporas do Advento", prec:PREC.FERIA_MAIOR, s:"Sl 118. Prope es tu, Domine... Is 11,1-5 • Lc 1,39-47", l:"/2025/12/19-dez-sexta-feira-das-temporas-do.html", p: { cor: COR.ROXA, gloria: false, credo: false, prefacio: PREF.COMUM, observacao: "Têmporas" }});
    addM(new Date(anoState.epochSabAdv), {t:"Sábado das Têmporas do Advento", prec:PREC.FERIA_MAIOR, s:"Sl 79. Veni, et ostende nobis faciem tuam... Is 19,20-22; 2Ts 2,1-8 • Lc 3,1-6", l:"/2025/12/20-dez-sabado-das-temporas-do-advento.html", p: { cor: COR.ROXA, gloria: false, credo: false, flectamus: true, prefacio: PREF.COMUM, observacao: "Têmporas · 7 Lições" }});

    let achouNome = false;
    for (let d = 2; d <= 5; d++) {
        if (new Date(anoState.ano, 0, d).getDay() === 0) {
            addM(new Date(anoState.ano, 0, d), {t:"Festa do Santíssimo Nome de Jesus", rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE, s:"Fl 2. In nomine Jesu omne genu flectatur... At 4,8-12 • Lc 2,21", l:"/2025/01/liturgia-diaria-05-jan-santissimo-nome.html", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL }});
            achouNome = true; break;
        }
    }
    if (!achouNome) addM(new Date(anoState.ano, 0, 2), {t:"Festa do Santíssimo Nome de Jesus", rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE, s:"Fl 2. In nomine Jesu omne genu flectatur... At 4,8-12 • Lc 2,21", l:"/2025/01/liturgia-diaria-05-jan-santissimo-nome.html", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL }});

    let achouDomEpi = false;
    for (let d = 7; d <= 12; d++) {
        if (new Date(anoState.ano, 0, d).getDay() === 0) {
            addM(new Date(anoState.ano, 0, d), {t:"Festa da Sagrada Família", rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE, s:"Pr 23. Exsultat gaudio pater justi... Cl 3,12-17 • Lc 2,42-52", l:"/2025/01/liturgia-diaria-12-jan-festa-da-sagrada.html", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.EPIFANIA, communicantes: "epifania" }});
            achouDomEpi = true; break;
        }
    }
    if (!achouDomEpi) addM(new Date(anoState.ano, 0, 12), {t:"Festa da Sagrada Família", rito:RITO.DUPLEX_II, prec:PREC.FESTA_II_CLASSE, s:"Pr 23. Exsultat gaudio pater justi... Cl 3,12-17 • Lc 2,42-52", l:"/2025/01/liturgia-diaria-12-jan-festa-da-sagrada.html", p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.EPIFANIA, communicantes: "epifania" }});

    let achouDomNatal = false;
    for (let d = 26; d <= 31; d++) {
        if (new Date(anoState.ano, 11, d).getDay() === 0) {
            addM(new Date(anoState.ano, 11, d), {t:"Domingo na Oitava do Natal", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_COMUM, s:"Sb 18. Dum medium silentium tenerent omnia... Gl 4,1-7 • Lc 2,33-40", l:"/2024/12/liturgia-diaria-domingo-dentro-da.html", dom:true, p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL, communicantes: "natal" }});
            achouDomNatal = true; break;
        }
    }
    if (!achouDomNatal) addM(new Date(anoState.ano, 11, 30), {t:"Missa do Domingo na Oitava do Natal", rito:RITO.SEMIDUPLEX, prec:PREC.DOMINGO_COMUM, s:"Sb 18. Dum medium silentium tenerent omnia... Gl 4,1-7 • Lc 2,33-40", l:"/2024/12/liturgia-diaria-domingo-dentro-da.html", dom:true, p: { cor: COR.BRANCA, gloria: true, credo: true, prefacio: PREF.NATAL, communicantes: "natal" }});

    Object.values(SANTOS_FIXOS).forEach(lista => lista.forEach(item => { if (!item.tipo) item.tipo = inferirTipo(item); }));

    // Executa o pré-cálculo de Translatio Accidentalis obrigatório
    const diasPorMes = [31, (new Date(anoState.ano, 1, 29).getDate() === 29 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let m = 0; m < 12; m++) {
        for (let d = 1; d <= diasPorMes[m]; d++) {
            getDiaLiturgicoCache(anoState.ano, m, d);
        }
    }
}

function inferirTipo(item) {
    if (item.tipo) return item.tipo;
    if (item.dom || item.prec === PREC.DOMINGO_I_CLASSE || item.prec === PREC.DOMINGO_II_CLASSE || item.prec === PREC.DOMINGO_COMUM) return TIPO.DOMINGO;
    if (item.isOitava) return TIPO.OITAVA;
    if (item.prec === PREC.SABADO_BVM) return TIPO.SABADO_BVM;
    if (item.prec === PREC.COMEMORACAO_FIXA) return TIPO.COMEMORACAO;
    if (item.prec === PREC.PRO_ALIQUIBUS_LOCIS) return TIPO.LOCAL;
    if (item.prec === PREC.VIGILIA_COMUM || item.prec === PREC.VIGILIA_MAIOR) return TIPO.VIGILIA;
    if (item.prec === PREC.FERIA_COMUM || item.prec === PREC.FERIA_MAIOR || item.prec === PREC.FERIA_PRIVILEGIADA) return TIPO.FERIA;
    if (item.prec === PREC.INFRA_OCTAVAM_PRIV_1_ORDEM || item.prec === PREC.INFRA_OCTAVAM || item.prec === PREC.INFRA_OCTAVAM_PRIV_2_ORDEM || item.prec === PREC.INFRA_OCTAVAM_PRIV_3_ORDEM) return TIPO.OITAVA;
    if (item.prec >= PREC.FESTA_SIMPLEX) return TIPO.FESTA;
    return TIPO.FERIA;
}

function calcularDiaLiturgico(itens) {
    if (!itens.length) return { principal: null, perdedores: [] };
    const ordenados = [...itens].sort((a, b) => {
        if (a.isVigAscensao && b.isLitania) return -1;
        if (b.isVigAscensao && a.isLitania) return 1;
        const aO1 = a.prec === PREC.INFRA_OCTAVAM_PRIV_1_ORDEM, bO1 = b.prec === PREC.INFRA_OCTAVAM_PRIV_1_ORDEM;
        const aI = a.prec >= PREC.FESTA_II_CLASSE, bI = b.prec >= PREC.FESTA_II_CLASSE;
        if (aO1 && bI) return -1; if (bO1 && aI) return 1;
        if (b.prec !== a.prec) return b.prec - a.prec;
        if ((a.primaria ? 1 : 0) !== (b.primaria ? 1 : 0)) return (b.primaria ? 1 : 0) - (a.primaria ? 1 : 0);
        if ((a.dignitas || 0) !== (b.dignitas || 0)) return (b.dignitas || 0) - (a.dignitas || 0);
        if ((a.isOitava ? 1 : 0) !== (b.isOitava ? 1 : 0)) return (b.isOitava ? 1 : 0) - (a.isOitava ? 1 : 0);
        if (a.tipo === TIPO.DOMINGO && b.tipo !== TIPO.DOMINGO) return -1;
        if (b.tipo === TIPO.DOMINGO && a.tipo !== TIPO.DOMINGO) return 1;
        if (a.isTransferred && !b.isTransferred) return 1;
        if (!a.isTransferred && b.isTransferred) return -1;
        return 0;
    });

    let principal = ordenados[0];
    const perdedores = [];
    ordenados.slice(1).forEach(item => {
        let omitido = false, transferido = false;
        const iTipo = item.tipo, isFeriaMaior = (iTipo === TIPO.FERIA && item.prec >= PREC.FERIA_MAIOR);
        if (iTipo === TIPO.FESTA && item.prec >= PREC.FESTA_II_CLASSE) {
            transferido = true;
        } else {
            if (principal.prec >= PREC.FESTA_I_CLASSE) {
                if (!isFeriaMaior && item.prec < PREC.FESTA_II_CLASSE && iTipo !== TIPO.DOMINGO) omitido = true;
                if (iTipo === TIPO.OITAVA && item.prec <= PREC.INFRA_OCTAVAM) omitido = true;
            } else if (principal.prec === PREC.INFRA_OCTAVAM_PRIV_1_ORDEM) {
                if (!isFeriaMaior && iTipo !== TIPO.DOMINGO) { if (iTipo === TIPO.OITAVA || item.prec === PREC.SABADO_BVM) omitido = true; }
            } else if (principal.prec === PREC.DOMINGO_II_CLASSE) {
                if (!isFeriaMaior && item.prec <= PREC.INFRA_OCTAVAM && iTipo !== TIPO.DOMINGO) omitido = true;
                if (item.prec === PREC.SABADO_BVM) omitido = true;
            } else if (principal.prec === PREC.INFRA_OCTAVAM_PRIV_2_ORDEM) {
                if (!isFeriaMaior && item.prec === PREC.INFRA_OCTAVAM && iTipo !== TIPO.DOMINGO) omitido = true;
                if (item.prec === PREC.SABADO_BVM) omitido = true;
            } else if (principal.prec === PREC.INFRA_OCTAVAM_PRIV_3_ORDEM) {
                if (item.prec === PREC.FESTA_SEMIDUPLEX && iTipo !== TIPO.DOMINGO) omitido = true;
                if (item.prec === PREC.SABADO_BVM) omitido = true;
            } else if (principal.prec >= PREC.FESTA_SEMIDUPLEX) {
                if (item.prec === PREC.SABADO_BVM) omitido = true;
            }
            if (item.prec === PREC.FERIA_COMUM) omitido = true;
            if (iTipo === TIPO.VIGILIA) {
                if (principal.tipo === TIPO.DOMINGO || principal.prec >= PREC.FESTA_I_CLASSE || principal.prec === PREC.FERIA_PRIVILEGIADA || (principal.tipo === TIPO.OITAVA && principal.prec >= PREC.INFRA_OCTAVAM_PRIV_3_ORDEM)) omitido = true;
            }
            if (ordenados.some(i => i.isPedroPaulo) && item.isPedroPaulo && principal.prec < PREC.FESTA_I_CLASSE) omitido = false;
        }
        if (transferido) { item.isTransferred = true; filaTransferencia.push(item); }
        else { perdedores.push({ item, omitido }); }
    });

    if (principal.prec < PREC.FERIA_COMUM) { perdedores.push({ item: principal, omitido: false }); principal = null; }

    perdedores.sort((a, b) => {
        if (a.item.isVigAscensao && b.item.isLitania) return -1;
        if (b.item.isVigAscensao && a.item.isLitania) return 1;
        const aFeria = a.item.tipo === TIPO.FERIA && a.item.prec >= PREC.FERIA_MAIOR, bFeria = b.item.tipo === TIPO.FERIA && b.item.prec >= PREC.FERIA_MAIOR;
        if (aFeria && !bFeria) return -1; if (!aFeria && bFeria) return 1;
        return (b.item.isPedroPaulo ? 1 : 0) - (a.item.isPedroPaulo ? 1 : 0) || b.item.prec - a.item.prec;
    });

    let numCom = 1, ultimoEvangelho = null;
    perdedores.forEach(p => {
        if (!p.omitido) {
            p.numCom = numCom++;
            if (!ultimoEvangelho) {
                const isDomVigFeria = (p.item.tipo === TIPO.DOMINGO) || (p.item.tipo === TIPO.FERIA && p.item.prec >= PREC.FERIA_MAIOR) || (p.item.tipo === TIPO.VIGILIA);
                const isFestaPropria = (p.item.tipo === TIPO.FESTA && p.item.p && p.item.p.comum === COMUM.PROPRIA);
                
                if (isDomVigFeria || isFestaPropria) {
                    ultimoEvangelho = p.item.t;
                }
            }
        }
    });
    if (principal) principal.ultimoEvangelho = ultimoEvangelho;
    return { principal, perdedores };
}

function obterSabadoBVM(t, mesNum, dia) {
    if (t >= anoState.iAdv.getTime() && t < anoState.epochNatal) return { s: "Is 45. Rorate, cæli, desuper... Is 7,10-15 • Lc 1,26-38", l: "/2025/06/missa-rorate-miss-de-sancta-maria-in.html" };
    if ((mesNum === 11 && dia >= 25) || mesNum === 0 || (mesNum === 1 && dia <= 2)) return { s: "Sl 44. Vultum tuum deprecabuntur... Tt 3,4-7 • Lc 2,15-20", l: "/2025/01/liturgia-diaria-11-jan-sancta-maria-in.html" };
    if (t >= new Date(anoState.ano, 1, 3).getTime() && t < anoState.epochQuaSanta) return { s: "Sedul. Salve, sancta parens... Eclo 24,14-16 • Lc 11,27-28", l: "/2026/04/sabado-de-nossa-senhora-iii.html" };
    if (t >= anoState.epochPascoa && t < anoState.epochPentecostes) return { s: "Sedul. Salve, sancta parens... Eclo 24,14-16 • Jo 19,25-27", l: "/2025/07/missa-comum-das-festas-da-bem.html" };
    return { s: "Sedul. Salve, sancta parens... Eclo 24,14-16 • Lc 11,27-28", l: "/2024/09/missa-salve-commune-festorum-b-mari.html" };
}

function getDiaLiturgicoCache(ano, mesNum, dia) {
    const keyCache = `${ano}-${mesNum + 1}-${dia}`;
    if (cacheDias.has(keyCache)) return cacheDias.get(keyCache);
    const key = `${mesNum + 1}-${dia}`, dataObj = new Date(ano, mesNum, dia), t = dataObj.getTime(), ds = dataObj.getDay();
    const mv = moveis[key] || [], fx = SANTOS_FIXOS[key] || [];
    const itens = [...filaTransferencia, ...mv, ...fx]; filaTransferencia = [];
    const emTempoEspecial = t >= anoState.epochCinzas && t <= dP(6).getTime();
    const emPentec = t >= anoState.epochPentecostes && t <= anoState.epochFimOitPent;
    const emAscensao = t >= anoState.epochAscensao && t <= anoState.epochFimAscensao;
    const emCorpus = t >= anoState.epochCorpus && t <= anoState.epochFimCorpus;
    const emCoracao = t >= anoState.epochCoracao && t <= anoState.epochFimCoracao;
    if (ds === 6 && !emTempoEspecial && !emPentec && !emAscensao && !emCorpus && !emCoracao) {
        if (!itens.some(i => i.prec >= PREC.FESTA_SEMIDUPLEX)) {
            const bvmInfo = obterSabadoBVM(t, mesNum, dia);
            itens.unshift({ t: "Sábado de Nossa Senhora", rito: RITO.SIMPLEX, prec: PREC.SABADO_BVM, tipo: TIPO.SABADO_BVM, s: bvmInfo.s, l: bvmInfo.l, p: { cor: COR.BRANCA, gloria: true, credo: false, prefacio: PREF.BVM, comum: COMUM.BVM } });
        }
    }
    const result = calcularDiaLiturgico(itens);
    result._cor = (result.principal && result.principal.p && result.principal.p.cor) ? result.principal.p.cor : obterCorTempo(t, mesNum, dia);
    result._t = t;
    cacheDias.set(keyCache, result); return result;
}

function obterCorTempo(t, mes, dia) {
    if (t === anoState.epochLaetare || t === anoState.iiiAdv.getTime()) return COR.ROSA;
    if (t === anoState.epochSextaSanta) return COR.PRETA;
    if (t === anoState.epochQuintaSanta || t === anoState.epochSabadoSanto) return COR.BRANCA;
    if (t === anoState.epochRamosEntrada) return COR.VERMELHA;
    if (t >= anoState.epochSegSanta && t <= anoState.epochQuaSanta) return COR.ROXA;
    if (t >= anoState.epochPentecostes && t <= anoState.epochFimOitPent) return COR.VERMELHA;
    if (t >= anoState.epochPascoa && t < anoState.epochPentecostes) return COR.BRANCA;
    if ((mes === 11 && dia >= 25) || (mes === 0 && dia <= 13)) return COR.BRANCA;
    if (t >= anoState.epochSeptuagesima && t < anoState.epochPascoa) return COR.ROXA;
    if (t >= anoState.iAdv.getTime() && t < anoState.epochNatal) return COR.ROXA;
    if (anoState.epochQuaSet && (t === anoState.epochQuaSet || t === anoState.epochSexSet || t === anoState.epochSabSet)) return COR.ROXA;
    if (t === anoState.epochQuaAdv || t === anoState.epochSexAdv || t === anoState.epochSabAdv) return COR.ROXA;
    return COR.VERDE;
}

function aplicarHerancaOitava(r, t, ano) {
    const isWithin = (inicioT, dias) => t >= inicioT && t <= inicioT + dias * 86400000;
    const injetar = (pref) => { r.credo = true; if (!PREFACIOS_PROPRIOS.has(r.prefacio)) r.prefacio = pref; };
    if (isWithin(anoState.epochNatal, 7)) injetar(PREF.NATAL);
    if (isWithin(new Date(ano, 0, 6).getTime(), 7)) injetar(PREF.EPIFANIA);
    if (isWithin(anoState.epochPascoa, 7)) injetar(PREF.PASCAL);
    if (isWithin(anoState.epochAscensao, 7)) injetar(PREF.ASCENSAO);
    if (isWithin(anoState.epochPentecostes, 7)) injetar(PREF.PENTECOSTES);
    if (isWithin(anoState.epochCorpus, 7)) injetar(PREF.COMUM);
    if (isWithin(anoState.epochCoracao, 7)) injetar(PREF.CORACAO);
    if (isWithin(new Date(ano, 7, 15).getTime(), 7)) injetar(PREF.BVM);
    if (isWithin(new Date(ano, 10, 1).getTime(), 7)) injetar(PREF.COMUM);
    if (isWithin(new Date(ano, 11, 8).getTime(), 7)) injetar(PREF.BVM);
    return r;
}

function obterJejumAbstinencia(t, ano, mes, dia) {
    const dow = new Date(ano, mes, dia).getDay(); if (dow === 0) return null;
    if (t === anoState.epochCinzas) return { texto: "Jej. + Abst.", classe: "jej-abst-total" };
    if (t > anoState.epochCinzas && t < anoState.epochRamosEntrada) return { texto: (dow === 5 || dow === 6) ? "Jej. + Abst." : "Jej.", classe: (dow === 5 || dow === 6) ? "jej-abst-total" : "jej-abst-jej" };
    if (t >= anoState.epochSegSanta && t <= anoState.epochSabadoSanto) return { texto: (t === anoState.epochSextaSanta || t === anoState.epochSabadoSanto) ? "Jej. + Abst." : "Jej.", classe: (t === anoState.epochSextaSanta || t === anoState.epochSabadoSanto) ? "jej-abst-total" : "jej-abst-jej" };
    if (t === dP(48).getTime() || t === dP(52).getTime() || t === dP(54).getTime() || t === dP(55).getTime()) return { texto: "Jej. + Abst.", classe: "jej-abst-total" };
    if (anoState.epochQuaSet && (t === anoState.epochQuaSet || t === anoState.epochSexSet || t === anoState.epochSabSet)) return { texto: "Jej. + Abst.", classe: "jej-abst-total" };
    if (t === anoState.epochQuaAdv || t === anoState.epochSexAdv || t === anoState.epochSabAdv) return { texto: "Jej. + Abst.", classe: "jej-abst-total" };
    if ((mes === 7 && dia === 14) || (mes === 9 && dia === 31) || (mes === 11 && dia === 24)) return { texto: "Jej. + Abst.", classe: "jej-abst-total" };
    if (dow === 5) return { texto: "Abst.", classe: "jej-abst-abst" }; return null;
}

function ehPreceito(t, ano, mes, dia) {
    if ((mes === 11 && dia === 25) || (mes === 0 && dia === 1) || (mes === 0 && dia === 6) || (mes === 7 && dia === 15) || (mes === 11 && dia === 8) || (mes === 5 && dia === 29) || (mes === 2 && dia === 19) || (mes === 10 && dia === 1)) return true;
    if (t === anoState.epochAscensao || t === anoState.epochCorpus) return true; return false;
}

function buscarDominanteDaSemana(ano, mesNum, dia) {
    const keyCache = `${ano}-${mesNum + 1}-${dia}`;
    if (cacheDominante.has(keyCache)) return cacheDominante.get(keyCache);
    const keyProprio = `${mesNum + 1}-${dia}`, oitavaLocal = [...(moveis[keyProprio] || []), ...(SANTOS_FIXOS[keyProprio] || [])].find(i => i.prec === PREC.INFRA_OCTAVAM_PRIV_2_ORDEM || i.prec === PREC.INFRA_OCTAVAM_PRIV_3_ORDEM);
    if (oitavaLocal) { const res = { item: oitavaLocal }; cacheDominante.set(keyCache, res); return res; }
    let result = null;
    for (let back = 1; back <= 7; back++) {
        const cursor = new Date(ano, mesNum, dia - back);
        if (cursor.getFullYear() !== ano) break; if (cursor.getDay() !== 0) continue;
        const dom = [...(moveis[`${cursor.getMonth() + 1}-${cursor.getDate()}`] || []), ...(SANTOS_FIXOS[`${cursor.getMonth() + 1}-${cursor.getDate()}`] || [])].find(i => i.dom === true);
        if (dom) { result = { item: dom, chaveData: `${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}` }; break; }
    }
    cacheDominante.set(keyCache, result); return result;
}

function badgeFeria(prec) {
    if (prec === PREC.FERIA_PRIVILEGIADA) return "Fér. priv."; if (prec === PREC.FERIA_MAIOR) return "Fér. maior"; if (prec === PREC.VIGILIA_MAIOR) return "Vig. maior"; if (prec === PREC.VIGILIA_COMUM) return "Vigília";
    if (prec === PREC.INFRA_OCTAVAM || prec === PREC.INFRA_OCTAVAM_PRIV_2_ORDEM || prec === PREC.INFRA_OCTAVAM_PRIV_3_ORDEM) return "Infra oct."; return "Féria";
}

function badgeFeriaAnonima(t) {
    if (t >= anoState.epochSegSanta && t <= anoState.epochSabadoSanto) return "Fér. priv.";
    if ((t > anoState.epochCinzas && t < anoState.epochSegSanta) || (t >= anoState.iAdv.getTime() && t < anoState.epochNatal)) return "Fér. maior";
    if ((t > anoState.epochAscensao && t <= anoState.epochFimAscensao) || (t > anoState.epochCorpus && t <= anoState.epochFimCorpus) || (t > anoState.epochCoracao && t <= anoState.epochFimCoracao)) return "Infra oct.";
    return "Féria";
}

function calcularRubricas(base, t, ano, prec) {
    if (!base || typeof base === "string") return base;
    let r = aplicarHerancaOitava(Object.assign({}, base), t, ano);
    const emSeptuagesima = t >= anoState.epochSeptuagesima && t < anoState.epochSabadoSanto, emCinzas = t >= anoState.epochCinzas && t < anoState.epochSabadoSanto, emPascoa = t >= anoState.epochPascoa && t < anoState.epochFimOitPent, emAdvento = t >= anoState.iAdv.getTime() && t < anoState.epochNatal;
    r._gradual = emSeptuagesima ? (r.tratoproprio ? "trato_proprio" : "trato") : (emAdvento ? "gradual" : (t === dP(48).getTime() ? "trato" : (emPascoa ? "duplo" : "aleluia")));
    if (!PREFACIOS_PROPRIOS.has(r.prefacio)) {
        if (emCinzas) r.prefacio = PREF.QUARESMA; if (emPascoa) r.prefacio = PREF.PASCAL; if (t === anoState.epochAscensao || (t > anoState.epochAscensao && t < dP(48).getTime())) r.prefacio = PREF.ASCENSAO; if (t >= anoState.epochPentecostes && t < anoState.epochFimOitPent) r.prefacio = PREF.PENTECOSTES;
    }
    if ((t >= anoState.epochNatal && t <= new Date(ano, 11, 31).getTime()) || t === new Date(ano, 0, 1).getTime()) r.communicantes = "natal";
    if (t >= new Date(ano, 0, 6).getTime() && t <= new Date(ano, 0, 13).getTime()) r.communicantes = "epifania";
    if (t === anoState.epochQuintaSanta) r.communicantes = "quintafeira";
    if (t >= anoState.epochSabadoSanto && t <= dP(6).getTime()) r.communicantes = "pascal";
    if (t >= anoState.epochAscensao && t <= anoState.epochFimAscensao) r.communicantes = "ascensao";
    if (t >= dP(48).getTime() && t <= dP(55).getTime()) r.communicantes = "pentecostes";
    r._conclusao = r.prefacio === PREF.DEFUNTOS ? "requiem" : (!r.gloria ? "benedicamus" : "ite");
    return r;
}

// =========================================================
// RODAR O MOTOR IMEDIATAMENTE (Expor Cor de Hoje)
// =========================================================
(function() {
    try {
        const _hoje = new Date();
        prepararMotorLiturgico(_hoje.getFullYear());
        const infoHoje = getDiaLiturgicoCache(_hoje.getFullYear(), _hoje.getMonth(), _hoje.getDate());
        window.corLiturgicaHoje = infoHoje._cor;
    } catch(e) {
        window.corLiturgicaHoje = "vm"; // fallback
    }
})();
