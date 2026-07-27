function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

export default PageHeader;
