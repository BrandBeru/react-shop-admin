import Link from 'next/link';
import { useEffect } from 'react';
import { deleteProduct } from '@services/api/products';
import { useRouter } from 'next/router';
import { Alert } from '@common/Alert';
import { useAuth } from '@hooks/useAuth';

export default function Home() {
  const { products, token, alert, setAlert, toggleAlert } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, []);

  const handleClose = (id) => {
    deleteProduct(id).then(() => {
      setAlert({
        active: true,
        message: 'Delete Product Successfully',
        type: 'error',
        autoClose: true,
      });
    });
  };

  return (
    <>
      <Alert alert={alert} handleClose={toggleAlert} />
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">BeruPortal - Market</h2>

            <p className="mt-4 text-gray-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur aliquam doloribus nesciunt eos fugiat. Vitae aperiam fugit consequuntur saepe laborum.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <span key={product.id} className="group relative block">
                <div className="relative h-[350px] sm:h-[450px]">
                  <img src={product?.images[0]} alt="" className="absolute inset-0 h-full w-full object-cover" />
                </div>
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <div className="flex flex-col items-start justify-end  p-3 bg-gray-800/60">
                    <h3 className="text-xl font-medium text-white">{product.title}</h3>
                    <h3 className="text-xl font-medium text-green-400">${product.price}</h3>
                    <p className="mt-1.5 max-w-[40ch] text-xs text-white">{product.description}</p>
                  </div>
                  <div className="flex gap-3">
                    <Link href={`/dashboard/edit/${product.id}`} className="mt-3 inline-block bg-blue-800 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                      Edit
                    </Link>
                    <button onClick={() => handleClose(product.id)} className="mt-3 inline-block bg-red-800 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                      Delete
                    </button>
                  </div>
                </div>
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
