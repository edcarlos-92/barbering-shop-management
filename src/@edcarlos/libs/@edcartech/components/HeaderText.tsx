import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"


// export default function HeaderText(props) {
const HeaderText = (props) => {
  const { pText, h2Text } = props
  return (

    <>

      <div className="card-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {h2Text && <p className="text-3xl sm:text-4xl font-extrabold ">{h2Text}</p>}
            {pText && <p className="text-xl mt-3 sm:mt-4">{pText}</p>}
          </div>
        </div>
      </div>

    </>
  )
}
export default HeaderText;



export const DynamicHeaderText = (props) => {
  const { pText, h2Text, h2Style, pStyle } = props
  return (
    <>
      <div className="card-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {h2Text && <p className={h2Style ? h2Style : `text-3xl sm:text-4xl font-extrabold`}>{h2Text}</p>}
            {pText && <p className={pStyle ? pStyle : `text-xl    mt-3   sm:mt-4`}>{pText}</p>}
          </div>
        </div>
      </div>
    </>
  )
}