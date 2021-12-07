

export default function CardSection() {
    return (
      <div className="card-section">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Only In 4 Steps You are Done 
            </h2>
            <p className="mt-3 text-xl  sm:mt-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus repellat laudantium.
            </p>
          </div>
        </div> */}
        <div className="pb-12  sm:pb-16 ">
          <div className="relative">
            <div className="absolute inset-0 h-1/2" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <dl className="rounded-lg  shadow-lg sm:grid sm:grid-cols-3 backdrop-blur-sm bg-white/5 card-data-list">
                  <div className="flex flex-col border-b  p-6 pt-2 text-center sm:border-0 sm:border-r">
                    <dd className="order-1 text-3xl font-extrabold ">Step 1</dd>
                    <dt className="order-2 mt-2 text-md leading-6 font-medium text-gray-500">Login or Register to access the platform</dt>
                    
                  </div>
                  <div className="flex flex-col border-t border-b  p-6 pt-2 text-center sm:border-0 sm:border-l sm:border-r">
                    <dd className="order-1 text-3xl font-extrabold ">Step 2</dd>
                    <dt className="order-2 mt-2 text-md leading-6 font-medium text-gray-500">Read the requirement carefully and provide your required information</dt>
                  </div>
                  <div className="flex flex-col border-t  p-6 pt-2 text-center sm:border-0 sm:border-l">
                    <dd className="order-1 text-3xl font-extrabold ">Step 3</dd>
                    <dt className="order-2 mt-2 text-md leading-6 font-medium text-gray-500">Check your Status and Stay tune if qualified</dt>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  