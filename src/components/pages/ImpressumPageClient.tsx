'use client';

export default function ImpressumPageClient() {
  return (
    <div className="pt-32 pb-16 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-isella-blue mb-12">
        Impressum
      </h1>

      {/* Isella Deutschland GmbH */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-isella-blue mb-4">
          Isella Deutschland GmbH
        </h2>
        <div className="text-gray-700 leading-relaxed space-y-1">
          <p>Beethovenstr. 9</p>
          <p>58566 Kierspe</p>
          <p>Germany</p>
        </div>
      </section>

      {/* Isella Group Sp. z o.o. */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-isella-blue mb-4">
          Isella Group Sp. z o.o.
        </h2>
        <div className="text-gray-700 leading-relaxed space-y-1">
          <p>ul. Jana Kasprowicza 15/2</p>
          <p>31-523 Krak&oacute;w</p>
          <p>Poland</p>
        </div>
      </section>

      {/* Vertreten durch */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-isella-blue mb-4">
          Vertreten durch
        </h2>
        <p className="text-gray-700">Dennis Czekalla</p>
      </section>

      {/* Kontakt */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-isella-blue mb-4">Kontakt</h2>
        <div className="text-gray-700 space-y-2">
          <p>
            E-Mail:{' '}
            <a
              href="mailto:info@isella-group.com"
              className="text-isella-orange hover:underline"
            >
              info@isella-group.com
            </a>
          </p>
          <p>
            Telefon:{' '}
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
