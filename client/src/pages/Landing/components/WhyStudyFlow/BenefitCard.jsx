function BenefitCard({
  icon: Icon,
  title,
  description,
  featured = false,
}) {
  return (
    <div
      className={`
        rounded-3xl
        border
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl

        ${
          featured
            ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-10 lg:col-span-3"
            : "border-slate-200 bg-white p-7"
        }
      `}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
        <Icon size={28} />
      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}

export default BenefitCard;