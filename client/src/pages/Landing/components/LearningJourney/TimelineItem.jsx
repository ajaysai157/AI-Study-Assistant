function TimelineItem({
  icon: Icon,
  title,
  description,
  last = false,
}) {
  return (
    <div className="relative flex gap-8">

      {/* Timeline */}

      <div className="flex flex-col items-center">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
          <Icon size={24} />
        </div>

        {!last && (
          <div className="mt-3 h-24 w-[2px] bg-emerald-200"></div>
        )}

      </div>

      {/* Content */}

      <div className="pb-14">

        <h3 className="text-xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-3 max-w-xl leading-7 text-slate-600">
          {description}
        </p>

      </div>

    </div>
  );
}

export default TimelineItem;