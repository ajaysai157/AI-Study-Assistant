function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-7
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-emerald-300
        hover:shadow-xl
      "
    >
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-emerald-50
          text-emerald-600
          transition
          group-hover:scale-110
        "
      >
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

export default FeatureCard;