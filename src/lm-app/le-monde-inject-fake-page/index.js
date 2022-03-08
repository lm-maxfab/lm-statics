!(function () {
  document.addEventListener('DOMContentLoaded', whenLoaded())
  if (document.readyState === 'complete' || document.readyState === 'loaded') whenLoaded()
  function whenLoaded () {
    const currentBodyContent = document.body.innerHTML
    const headerContent = `
    <!-- Header -->
    <header class="lm-app-fake-lm-header" id="Header">
      <div class="lm-app-fake-lm-header__inner">
        <div class="lm-app-fake-lm-header__burger-and-logo">
          <div class="lm-app-fake-lm-header__burger">
            <img src="{{ROOT_URL}}/lm-app/le-monde-inject-fake-page/assets/burger-icon.svg" />
          </div>
          <div class="lm-app-fake-lm-header__logo">
            <a href="https://www.lemonde.fr/">
            <img src="{{ROOT_URL}}/lm-app/le-monde-inject-fake-page/assets/lm-logo.svg" />
            </a>
          </div>
        </div>
        <div class="lm-app-fake-lm-header__tabs">
          <span class="lm-app-fake-lm-header__tab">
          <img src="{{ROOT_URL}}/lm-app/le-monde-inject-fake-page/assets/home-icon.svg" />
          </span>
          <span class="lm-app-fake-lm-header__tab">Actualités</span>
          <span class="lm-app-fake-lm-header__tab">Économie</span>
          <span class="lm-app-fake-lm-header__tab">Vidéos</span>
          <span class="lm-app-fake-lm-header__tab">Opinions</span>
          <span class="lm-app-fake-lm-header__tab">Culture</span>
          <span class="lm-app-fake-lm-header__tab">M le Mag</span>
          <span class="lm-app-fake-lm-header__tab">Services</span>
          <span class="lm-app-fake-lm-header__tab">
          <img src="{{ROOT_URL}}/lm-app/le-monde-inject-fake-page/assets/search-icon.svg" />
          </span>
        </div>
        <div class="lm-app-fake-lm-header__account">
          <img src="{{ROOT_URL}}/lm-app/le-monde-inject-fake-page/assets/profile-pic.svg" />
          <span class="lm-app-fake-lm-header__account-name">U. SERNAME</span>
        </div>
      </div>
    </header>`.replace(/\n\s{2}/gm, '\n')
    const footerContent = `
    <!-- Footer -->
    <footer class="footer footer--abo old__footer lm-app-fake-lm-footer">
      <section class="zone zone--footer old__zone">
        <section class="footer__main">
          <section class="footer__top">
            <section class="footer__category">
              <button tabindex="-1" type="button" name="button" class="footer__title footer__title--category" data-toggle="collapse" data-toggle-target=".footer__links"> Rubriques </button> 
              <ul class="footer__links">
                <li class="footer__bullet"><a class="footer__link" href="/actualite-en-continu/">Actualités en direct</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/international/">International</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/politique/">Politique</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/societe/">Société</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/economie/">Économie</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/les-decodeurs/">Les Décodeurs</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/resultats-elections/">Résultats élections 2021</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/sport/">Sport</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/planete/">Planète</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/sciences/">Sciences</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/campus/">M Campus</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/afrique/">Le Monde Afrique</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/pixels/">Pixels</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/actualite-medias/">Médias</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/verification/">Décodex</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/videos/">Vidéos</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/sante/">Santé</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/big-browser/">Big browser</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/disparitions/">Disparitions</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/education/">Éducation</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/argent/">Argent et placements</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/emploi/">Emploi</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/archives-du-monde/">Archives</a></li>
                <li class="footer__bullet"><a class="footer__link" href="/le-monde-et-vous/">Le Monde &amp; Vous</a></li>
              </ul>
            </section>
            <section class="footer__category-container">
              <section class="footer__category">
                <button tabindex="-1" type="button" name="button" class="footer__title footer__title--category" data-toggle="collapse" data-toggle-target=".footer__links">Opinions</button> 
                <ul class="footer__links">
                  <li class="footer__bullet"><a class="footer__link" href="/editoriaux/">Editoriaux</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/idees-chroniques/">Chroniques</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/analyses/">Analyses</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/idees-tribunes/">Tribunes</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/vie-des-idees/">Vie des idées</a></li>
                </ul>
              </section>
              <section class="footer__category">
                <button tabindex="-1" type="button" name="button" class="footer__title footer__title--category" data-toggle="collapse" data-toggle-target=".footer__links">M le Mag</button> 
                <ul class="footer__links">
                  <li class="footer__bullet"><a class="footer__link" href="/m-perso/">L’époque</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/m-styles/">Le style</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/m-gastronomie/">Gastronomie</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/m-voyage/">Voyage</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/m-mode/">Mode</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/les-recettes-du-monde/">Les recettes du Monde</a></li>
                </ul>
              </section>
              <section class="footer__category">
                <button tabindex="-1" type="button" name="button" class="footer__title footer__title--category" data-toggle="collapse" data-toggle-target=".footer__links">Culture</button> 
                <ul class="footer__links">
                  <li class="footer__bullet"><a class="footer__link" href="/cinema/">Cinéma</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/televisions-radio/">Télévision</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/livres/">Monde des livres</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/musiques/">Musique</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/arts/">Arts</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/bande-dessinee/">BD</a></li>
                </ul>
              </section>
            </section>
            <section class="footer__category-container">
              <section class="footer__category">
                <button tabindex="-1" type="button" name="button" class="footer__title footer__title--category" data-toggle="collapse" data-toggle-target=".footer__links">Services</button> 
                <ul class="footer__links">
                  <li class="footer__bullet"><a class="footer__link" href="https://www.lemonde.fr/memorable/" rel="noopener" target="_blank">Mémorable : cultivez votre mémoire</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/guides-d-achat/">Guides d’achat</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://codespromo.lemonde.fr/" rel="noopener" target="_blank">Codes Promo</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://formation-professionnelle.lemonde.fr/" target="_blank" rel="noopener">Formation professionnelle</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://anglais.lemonde.fr/" target="_blank" rel="noopener">Cours d’anglais</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://progresser-orthographe.lemonde.fr/" target="_blank" rel="noopener">Cours d’orthographe et grammaire</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://conjugaison.lemonde.fr/conjugaison/" rel="noopener" target="_blank">Conjugaison</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://jardinage.lemonde.fr/" target="_blank" rel="noopener">Découvrir le jardinage</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://www.dicocitations.com/" target="_blank" rel="noopener">Dictionnaire de citations</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://paroles2chansons.lemonde.fr/" target="_blank" rel="noopener">Paroles de chansons</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://jeux.lemonde.fr/" rel="noopener" target="_blank">Jeux</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://immobilier.lemonde.fr/" rel="noopener" target="_blank">Annonces immobilières</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="http://prix-immobilier.lemonde.fr/estimation-immobiliere/" rel="noopener" target="_blank">Prix de l’immobilier</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://carnet.lemonde.fr/annonce" rel="noopener" target="_blank">Avis de décès dans Le Monde</a></li>
                </ul>
              </section>
              <section class="footer__category footer__category--last">
                <button tabindex="-1" type="button" name="button" class="footer__title footer__title--category" data-toggle="collapse" data-toggle-target=".footer__links">Sites du Groupe</button> 
                <ul class="footer__links">
                  <li class="footer__bullet"><a class="footer__link" href="https://www.courrierinternational.com/" rel="noopener" target="_blank">Courrier International</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="http://www.sdllemonde.fr/" rel="noopener" target="_blank">La société des lecteurs du Monde</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="http://www.lavie.fr/" rel="noopener" target="_blank">La Vie</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://www.huffingtonpost.fr/" rel="noopener" target="_blank">Le HuffPost</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://www.nouvelobs.com/" rel="noopener" target="_blank">L’Obs</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://www.monde-diplomatique.fr/" rel="noopener" target="_blank">Le Monde diplomatique</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://www.telerama.fr/" rel="noopener" target="_blank">Télérama</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://www.lemonde.fr/qui-sommes-nous/article/2007/11/17/talents-un-site-d-emploi-coedite-par-le-monde-interactif-et-telerama_978404_3386.html">Talents</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://www.sourcesure.eu/" rel="noopener" target="_blank">Source Sûre</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="/le-club-de-l-economie/">Le Club de l’économie</a></li>
                  <li class="footer__bullet"><a class="footer__link" href="https://mpublicite.fr/" rel="noopener" target="_blank">M Publicité</a></li>
                </ul>
              </section>
            </section>
          </section>
          <section class="footer__middle ">
            <section class="footer__cta--container">
              <section class="footer__cta">
                <p class="footer__title">Newsletters du monde</p>
                <a class="footer__link footer__link--cta" href="/newsletters/" rel="noopener" target="_blank"><span class="footer__icon icon__mail"></span>Recevoir les newsletters du Monde</a> 
              </section>
              <section class="footer__cta">
                <p class="footer__title">Applications Mobiles</p>
                <section class="footer__apps">
                  <span class="footer__icon icon__apps"></span> 
                  <ul class="footer__links footer__links--apps">
                    <li class="footer__bullet footer__bullet--apps"><a class="footer__link footer__link--apps" href="/applications-groupe/lemonde/ios/iphone/">Sur iPhone</a></li>
                    <li class="footer__bullet footer__bullet--apps"><a class="footer__link footer__link--apps" href="/applications-groupe/lemonde/android/smartphone/">Sur Android</a></li>
                  </ul>
                </section>
              </section>
            </section>
            <section class="footer__cta">
              <p class="footer__title">Abonnement</p>
              <a class="footer__link footer__link--cta" href="https://abo.lemonde.fr/#xtor=CS1-454[CTA_LMFR]-[FOOTER]-56-[Rubrique]" rel="noopener" target="_blank"><span class="footer__icon icon__subscribe"></span>S’abonner</a> <a class="footer__link footer__link--cta js-footer-login" href="https://secure.lemonde.fr/sfuser/connexion"><span class="footer__icon icon__connexion"></span>Se connecter</a> <a class="footer__link footer__link--cta" href="https://journal.lemonde.fr/"><span class="footer__icon icon__journal"></span>Consulter le Journal du jour</a> <a class="footer__link footer__link--cta" href="https://evenements-abonnes.lemonde.fr/" rel="noopener" target="_blank">Évenements abonnés</a> <a class="footer__link footer__link--cta" href="https://festival.lemonde.fr">Le Monde Festival</a> <a class="footer__link footer__link--cta" href="https://boutique.lemonde.fr/" rel="noopener" target="_blank">La boutique du Monde</a> 
            </section>
            <section class="footer__cta">
              <ul class="footer__links footer__links--list ">
                <li class="footer__bullet "><a class="footer__link footer__link--list" href="https://moncompte.lemonde.fr/mentions-legales">Mentions légales</a></li>
                <li class="footer__bullet "><a class="footer__link footer__link--list" href="https://www.lemonde.fr/actualite-medias/article/2010/11/03/la-charte-d-ethique-et-de-deontologie-du-groupe-le-monde_1434737_3236.html">Charte du Groupe</a></li>
                <li class="footer__bullet "><a class="footer__link footer__link--list" href="https://www.lemonde.fr/confidentialite/">Politique de confidentialité</a></li>
                <li class="footer__bullet "><a class="footer__link footer__link--list gdpr-cs-parameters-link" href="#">Gestion des cookies</a></li>
                <li class="footer__bullet "><a class="footer__link footer__link--list" href="https://moncompte.lemonde.fr/cgv" rel="noopener" target="_blank">Conditions générales</a></li>
                <li class="footer__bullet "><a class="footer__link footer__link--list" href="/faq/" rel="noopener" target="_blank">Aide (FAQ)</a></li>
              </ul>
            </section>
          </section>
        </section>
        <section class="footer__bottom">
          <p class="footer__title">Suivez Le Monde</p>
          <section class="footer__social">
            <ul class="footer__links footer__links--social">
              <li class="footer__bullet footer__bullet--social"><a class="footer__link" href="https://www.facebook.com/lemonde.fr" rel="noopener" target="_blank"><span class="footer__icon icon__facebook icon__facebook--footer"></span>Facebook</a></li>
              <li class="footer__bullet footer__bullet--social"><a class="footer__link" href="https://www.youtube.com/user/LeMonde" rel="noopener" target="_blank"><span class="footer__icon icon__youtube"></span>Youtube</a></li>
              <li class="footer__bullet footer__bullet--social"><a class="footer__link" href="https://twitter.com/lemondefr" rel="noopener" target="_blank"><span class="footer__icon icon__twitter icon__twitter--footer"></span>Twitter</a></li>
            </ul>
            <ul class="footer__links footer__links--social">
              <li class="footer__bullet footer__bullet--social"><a class="footer__link" href="https://www.instagram.com/lemondefr/?hl=fr" rel="noopener" target="_blank"><span class="footer__icon icon__instagram icon__instagram--footer"></span>Instagram</a></li>
              <li class="footer__bullet footer__bullet--social"><a class="footer__link" href="https://www.snapchat.com/discover/Le-Monde/8843708388" rel="noopener" target="_blank"><span class="footer__icon icon__snapchat"></span>Snapchat</a></li>
              <li class="footer__bullet footer__bullet--social"><a class="footer__link" href="https://www.lemonde.fr/actualite-medias/article/2019/08/12/les-flux-rss-du-monde-fr_5498778_3236.html"><span class="footer__icon icon__rss"></span>Fils RSS</a></li>
            </ul>
          </section>
        </section>
      </section>
    </footer>`.replace(/\n\s{2}/gm, '\n')
  
    const newBodyContent = headerContent + currentBodyContent + footerContent
    document.body.innerHTML = newBodyContent
  }
})();
