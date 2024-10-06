import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function FilterRadioGroup({array,title=""}) {
  return (
    <RadioGroup className="mb-5">
        <h1 className="text-sm text-slate-600 font-semibold">{title}</h1>
        {
           array.map((item,i)=>(
            <div key={i} className="flex items-center space-x-2">
            <RadioGroupItem value={item} id={item} className=""/>
            <Label htmlFor={item} className="text-md">{item}</Label>
          </div>
           ))
        }
    </RadioGroup>
  )
}
