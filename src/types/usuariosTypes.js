export const TRAER_TODOS = 'usuarios_get_users'
export const CARGANDO = 'usuarios_cargando'
export const ERROR = 'usuarios_error'

//con esto evitamos errores de typo en el dispatch y si hacemos un cambio aqui lo hara en todos los reducers y acctions creaters que esten en la app, solo debemos importarlo y usarlo en lugar del type. incluso si nos equivocamos aqui no habra errores en los demas archivos ya que sera el mismo nombre dentro de todas las constantes. si cometemos un error importanto esta constante en el inspector nos mostrar el error, a diferencia de si nos equivocamos en el nombre del dispatch o reducer.