function StepCard({
  icon: Icon,
  title,
  description,
  number,
}) {
  return (
    <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <span className="absolute right-6 top-6 text-5xl font-black text-slate-100">
        {number}
      </span>

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
        <Icon size={30} />
      </div>

      <h3 className="mt-6 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600">
        {description}
      </p>

    </div>
  );
}

export default StepCard;