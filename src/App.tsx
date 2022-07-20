import { Field, Form, Formik, useFormikContext } from 'formik';
import './App.css';

/** 
 * Here your can place the initial values of your calculator. 
 * The key in the detect corresponds to the attribute `name=...` you'll use for the corresponding field.
 */
const INITIAL_VALUES = {
  length: 170,
  weight: 65.5,
}

/**
 * Start editing your calculator here ⬇. 
 * You can but basic JS logic in the body of the function and use the `return` statement for the HTML that should be rendered.
 */
export function Calculator() {

  // 💡 the variable values provides access to all the current values of the form
  const { values } = useFormikContext<typeof INITIAL_VALUES>()

  let result = ((values.weight)/((values.length/100)*(values.length/100))).toFixed(1)
  
  
  // here comes the HTML for your calculator
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-bold text-blue-700">
            BMI calculator
          </h1>
          </div>
        <Form className="rounded-md">
          
          <div className="mt-2">
            <label className='block text-sm font-medium text-gray-700'>
              Lengte (cm):
            </label>

            <Field className="t-1 block shadow-sm sm:text-sm border-gray-300 rounded-md" type="number" name="length" min={50} max={250} />
          </div>
          <div className="col-span-6 sm:col-span-3 lg:col-span-2">
            <label className='block text-sm font-medium text-gray-700'>
              Gewicht (kg):
            </label>
            <Field className="t-1 block shadow-sm sm:text-sm border-gray-300 rounded-md" type="number" name="weight" min={0} max={250} precision={2} step={0.1}/>
          </div>
          
          <div className="col-span-6 sm:col-span-3 lg:col-span-2 block">
            <label className="block font-bold text-gray-700">Resultaat:</label>
            <h1 className="text-2xl text-center items-center justify-center px-5 py-3 border border-transparent font-medium rounded-md text-blue-700 bg-indigo-50 hover:bg-indigo-300">{result} kg/m²</h1>
          </div>
        </Form>
      </div>
    </div>
  )
}

/**
 * This App component serves as a container of the calculator and will handle all state updates of the value
 * 
 */
export default function App() {
  return (
    <div id="page-container" className="px-5 py-3">
      <Formik initialValues={INITIAL_VALUES} onSubmit={(values) => window.parent.postMessage(JSON.stringify(values), "*")}>
        <Calculator />
      </Formik>
    </div>
  )
}