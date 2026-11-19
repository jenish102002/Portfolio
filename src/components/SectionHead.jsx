export default function SectionHead({ index, label, title, note }) {
  return (
    <div className="shead" data-reveal>
      <span className="eyebrow">
        {index && <span className="eyebrow__idx">{index}</span>}
        {label}
      </span>
      <h2>
        {title} {note && <span className="shead__sub">{note}</span>}
      </h2>
    </div>
  )
}
