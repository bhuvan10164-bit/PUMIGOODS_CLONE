from rest_framework.decorators import api_view
from rest_framework.response   import Response
from rest_framework            import status
from .models                   import Product
from .serializers               import ProductSerializer

@api_view(['GET'])
def product_list(request):
    slug = request.query_params.get('slug')
    if slug:
        products = Product.objects.filter(slug=slug)
    else:
        products = Product.objects.all()
    return Response(ProductSerializer(products, many=True).data)

@api_view(['GET'])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    return Response(ProductSerializer(product).data)
