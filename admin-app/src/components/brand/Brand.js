import { useEffect } from "react";
import $ from 'jquery';
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_BRAND_MESSAGE, REMOVE_BRAND_LOADER, REMOVE_BRAND_ERRORS } from "../../store/types/BrandType";
import { fetchbrands, fetchBrand, deleteAction, statusAction } from '../../store/actions/BrandAction';
import Loader from "../loader/Loader";
import Pagination from "../pagination/Pagination";
import AddModal from './AddModal';
import EditModal from "./EditModal";
import Swal from 'sweetalert2'


const Brand = (props) => {
    const { message, loading} = useSelector((state) => state.BrandReducer);
    const { brands, count, perPage, pageLink, brandErrors, brand_status, brandId } = useSelector((state)=>state.BrandReducer);
    
    const dispatch = useDispatch();
    const query = new URLSearchParams(props.location.search);
    const page = query.get('page')
    // alert(page);

    const deleteBrand =  (id) =>{
     Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteAction(id));
        }
      })
    }
    const brandStatus = () =>{
        $(document).on('click', '.updateBrandStatus', function(){
           const brand_id = $(this).attr('data-brand');
           const status = $(this).children("i").attr("status");
           console.log(brand_id)
           dispatch(statusAction({brand_id,status}));
        })
    }
    const editBrand = (id) =>{
        dispatch(fetchBrand(id));
    }
    useEffect(() => {
       if(message){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: message,
            toast: true,
            showConfirmButton: false,
            timer: 2000
          })
          document.getElementById('close-modal').click();
          document.getElementById('edit-modal').click();
          dispatch({type: REMOVE_BRAND_LOADER});
          dispatch({type: REMOVE_BRAND_MESSAGE});
          dispatch(fetchbrands(page));
       }  

    },[message]);

    useEffect(()=>{
        if(Object.keys(brandErrors).length > 0){
            for(const error in brandErrors){
                toast.error(brandErrors[error])
            }
            dispatch({type: REMOVE_BRAND_ERRORS});
        }
    },[brandErrors])

    useEffect(() => {
      dispatch(fetchbrands(page));
   },[page]);

    useEffect(()=>{
        if(brand_status == 0){
        $('#brand-'+brandId).html(`<i class='fas fa-toggle-off' aria-hidden='true' status=${brand_status}></i>`);
        }else{
        $('#brand-'+brandId).html(`<i class='fas fa-toggle-on' aria-hidden='true' status=${brand_status}></i>`);
        }
    },[brand_status,brandId]);

    return (
        <div class="content-wrapper">
            <Helmet>
                <title>Brand - Ecommerce</title>
                <meta name="description" content="User Login Here" />
            </Helmet>
            <Toaster position="top-right" reverseOrder={false}/>
            <section class="content">
            <div class="container-fluid">
                <div class="row">
                <div class="col-12">
                    <div class="card">
                    <div class="card-header">
                        <h4 className="float-left">All Brand</h4>
                        <h3><button type="button" class="btn btn-primary float-right text-bold" data-toggle="modal" data-target="#exampleModal">Add Brand</button></h3>
                        <AddModal/>
                    </div>
                    <div class="card-body">
                        <table id="example2" class="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Brand Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                        !loading?
                            brands.length > 0 ?
                            brands.map((brand,index)=>(
                            <tr key={brand.id}>
                            <td>{ index+1 }</td>
                            <td>{ brand.name }</td>
                            <td>
                              {
                                (brand.status === 1) ? 
                                <a class="updateBrandStatus" data-brand={brand.id} id={`brand-${brand.id}`} onClick={brandStatus} href="javascript:void(0)"> <i class="fas fa-toggle-on" status={brand.status} aria-hidden="true"></i></a>
                                :<a class="updateBrandStatus" data-brand={brand.id} id={`brand-${brand.id}`} onClick={brandStatus} href="javascript:void(0)"> <i class="fas fa-toggle-off" status={brand.status} aria-hidden="true"></i> </a> 
                              }
                          </td>
                            <td>
                                <button id={brand.id} onClick={ ()=>editBrand(brand.id) } type="button" data-toggle="modal" data-target="#editModal" className="text-success"><i className="fas fa-edit"></i></button>
                                &nbsp;&nbsp;
                                <button onClick={() => deleteBrand(brand.id)} className="text-danger"><i className="fas fa-trash"></i></button>
                            </td>
                            </tr>
                            ))
                            :'No Brands'
                        :(<Loader/>)
                        }
                        <EditModal/>
                        </tbody>
                        </table>
                        
                    </div>
                    </div>
                    </div>
                </div>
                </div>
                {!loading ? <Pagination page={page} perPage={perPage} count={count} pageLink={pageLink} /> : ''}
            </section>
        </div>
    );
}

export default Brand;