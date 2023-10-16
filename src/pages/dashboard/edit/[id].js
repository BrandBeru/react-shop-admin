import FormProduct from '@components/FormProduct';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';
import useAlert from '@hooks/useAlert';
import { Alert } from '@common/Alert';

export default function Edit() {
  const [product, setProduct] = useState([]);
  const { alert, setAlert, toggleAlert } = useAlert();
  const router = useRouter();
  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getProduct() {
      const response = await axios.get(endPoints.products.getProduct(id));
      setProduct(response.data);
    }
    getProduct();
  }, [router?.isReady]);
  return (
    <>
      <Alert alert={alert} handleClose={toggleAlert} />
      <FormProduct product={product} setAlert={setAlert} />;
    </>
  );
}
