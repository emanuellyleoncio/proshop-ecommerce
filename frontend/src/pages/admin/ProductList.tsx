import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import ButtonLinkCustom from "../../components/ButtonLinkCustom";
import { getErrorMessage } from "../../utils/handleErrorMessage";
import { Product } from "../../types/Product";

const ProductList = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteProduct(id);
        refetch();
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct({});
        refetch();
      } catch (err: any) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{getErrorMessage(error)}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {data.products.map((product: Product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                  <ButtonLinkCustom
                    to={`/admin/product/${product._id}/edit`}
                    variant="light"
                    className="btn-sm mx-2"
                  >
                    <FaEdit />
                  </ButtonLinkCustom>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                  </td>
                </tr>
                ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductList;
