'use client';

import { useLocale } from 'next-intl';

export default function PrivacyPageClient() {
  const locale = useLocale();

  const isGerman = locale === 'de';
  const isPolish = locale === 'pl';

  return (
    <div className="pt-32 pb-16 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-isella-blue mb-12">
        {isGerman
          ? 'Datenschutzerkl\u00e4rung'
          : isPolish
            ? 'Polityka prywatno\u015bci'
            : 'Privacy Policy'}
      </h1>

      {/* Section 1 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-isella-blue mb-4">
          {isGerman
            ? '1. Datenschutz auf einen Blick'
            : isPolish
              ? '1. Ochrona danych w skr\u00f3cie'
              : '1. Data Protection at a Glance'}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {isGerman
            ? 'Die folgenden Hinweise geben einen einfachen \u00dcberblick dar\u00fcber, was mit deinen personenbezogenen Daten passiert, wenn du diese Website besuchst. Personenbezogene Daten sind alle Daten, mit denen du pers\u00f6nlich identifiziert werden kannst.'
            : isPolish
              ? 'Poni\u017csze informacje stanowi\u0105 prosty przegl\u0105d tego, co dzieje si\u0119 z Twoimi danymi osobowymi podczas odwiedzania tej strony internetowej. Dane osobowe to wszelkie dane, za pomoc\u0105 kt\u00f3rych mo\u017cna Ci\u0119 zidentyfikowa\u0107.'
              : 'The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you.'}
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-isella-blue mb-4">
          {isGerman
            ? '2. Datenerfassung auf dieser Website'
            : isPolish
              ? '2. Zbieranie danych na tej stronie'
              : '2. Data Collection on This Website'}
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          {isGerman
            ? 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten kannst du dem Impressum dieser Website entnehmen.'
            : isPolish
              ? 'Przetwarzanie danych na tej stronie odbywa si\u0119 przez operatora strony. Dane kontaktowe operatora znajdziesz w sekcji Impressum.'
              : 'Data processing on this website is carried out by the website operator. You can find their contact details in the Impressum section of this website.'}
        </p>
        <p className="text-gray-700 leading-relaxed">
          {isGerman
            ? 'Deine Daten werden zum einen dadurch erhoben, dass du sie uns mitteilst. Hierbei kann es sich z.B. um Daten handeln, die du in ein Kontaktformular eingibst. Andere Daten werden automatisch oder nach deiner Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).'
            : isPolish
              ? 'Twoje dane s\u0105 zbierane cz\u0119\u015bciowo poprzez ich podanie przez Ciebie. Mog\u0105 to by\u0107 na przyk\u0142ad dane wprowadzone w formularzu kontaktowym. Inne dane s\u0105 zbierane automatycznie lub za Twoj\u0105 zgod\u0105 podczas odwiedzania strony przez nasze systemy IT. S\u0105 to g\u0142\u00f3wnie dane techniczne (np. przegl\u0105darka internetowa, system operacyjny lub czas wy\u015bwietlenia strony).'
              : 'Your data is collected in part by you providing it to us. This could be data you enter into a contact form, for example. Other data is collected automatically or with your consent when you visit the website by our IT systems. This is primarily technical data (e.g., internet browser, operating system, or time of page access).'}
        </p>
      </section>

      {/* Section 3 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-isella-blue mb-4">
          {isGerman
            ? '3. Cookies'
            : isPolish
              ? '3. Pliki cookies'
              : '3. Cookies'}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {isGerman
            ? 'Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf deinem Rechner abgelegt werden und die dein Browser speichert. Sie dienen dazu, unser Angebot nutzerfreundlicher und sicherer zu machen. Einige Cookies sind \u201etechnisch notwendig\u201c und werden automatisch gesetzt. Andere Cookies werden nur mit deiner Einwilligung verwendet.'
            : isPolish
              ? 'Ta strona internetowa u\u017cywa plik\u00f3w cookies. Cookies to ma\u0142e pliki tekstowe przechowywane na Twoim urz\u0105dzeniu przez przegl\u0105dark\u0119. S\u0142u\u017c\u0105 one do uczynienia naszej oferty bardziej przyjazn\u0105 i bezpieczn\u0105. Niekt\u00f3re pliki cookies s\u0105 \u201etechnicznie niezb\u0119dne\u201d i s\u0105 ustawiane automatycznie. Inne cookies s\u0105 u\u017cywane tylko za Twoj\u0105 zgod\u0105.'
              : 'This website uses cookies. Cookies are small text files stored on your device by your browser. They serve to make our offering more user-friendly and secure. Some cookies are "technically necessary" and are set automatically. Other cookies are only used with your consent.'}
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-isella-blue mb-4">
          {isGerman
            ? '4. Kontaktformular'
            : isPolish
              ? '4. Formularz kontaktowy'
              : '4. Contact Form'}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {isGerman
            ? 'Wenn du uns per Kontaktformular Anfragen zukommen l\u00e4sst, werden deine Angaben aus dem Anfrageformular inklusive der von dir dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und f\u00fcr den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne deine Einwilligung weiter.'
            : isPolish
              ? 'Je\u015bli wy\u015blesz do nas zapytanie za pomoc\u0105 formularza kontaktowego, Twoje dane z formularza, w tym podane dane kontaktowe, b\u0119d\u0105 przechowywane w celu przetworzenia zapytania i na wypadek dalszych pyta\u0144. Nie udost\u0119pniamy tych danych bez Twojej zgody.'
              : 'If you send us inquiries via the contact form, your details from the inquiry form, including the contact data you provided, will be stored for the purpose of processing the inquiry and for follow-up questions. We do not share this data without your consent.'}
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-isella-blue mb-4">
          {isGerman
            ? '5. Verantwortliche Stelle'
            : isPolish
              ? '5. Podmiot odpowiedzialny'
              : '5. Responsible Entity'}
        </h2>
        <div className="text-gray-700 leading-relaxed space-y-1">
          <p className="font-semibold">Isella Deutschland GmbH</p>
          <p>Beethovenstr. 9</p>
          <p>58566 Kierspe</p>
          <p>Germany</p>
          <p className="mt-3">
            E-Mail:{' '}
            <a
              href="mailto:info@isella-group.com"
              className="text-isella-orange hover:underline"
            >
              info@isella-group.com
            </a>
          </p>
          <p>
            {isGerman ? 'Telefon' : isPolish ? 'Telefon' : 'Phone'}:{' '}
            <a
              href="tel:+4923598092855"
              className="text-isella-orange hover:underline"
            >
              +49 2359 809 285 5
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
