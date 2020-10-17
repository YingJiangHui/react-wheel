let importIcons = (requireContext) => requireContext.keys().forEach(requireContext)

try{
  importIcons(require.context('../icons',true,/\.svg$/))
}catch(e){
  console.log(e)
}