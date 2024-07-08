// const router = express.Router();
const products = [];

exports.getAddItem = (req, res, next) => {
    res.render('add-item', {
        pageTitle: 'Items', 
        path: '/admin/add-product', 
        formsCSS:true, 
        productsCSS:true, 
        activeProducts:true 
    });
};


exports.postAddItem = (req, res, next) => {
    //기본
    items.push({ title: req.body.title });
    res.redirect('/');
    
};

exports.getItems = (req, res, next) => {
    res.render('shop', {
        products: products,
        pageTitle: 'shop',
        path: '/',  // path 변수를 템플릿에 전달
        hasProducts: products.length > 0,
        activeShop: true,
        productsCSS: true
    });

    //pug
    // res.render('market', {items: items, pageTitle: 'Market'});
}