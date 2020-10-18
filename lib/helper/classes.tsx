function classes(...names: (string | undefined | { [key: string]: boolean })[]) {
  return names[0]?.constructor === Object
    ?
    Object.keys(names[0]).filter((key: string) =>(names[0] as { [key: string]: boolean })[key]).join(' ')
    :
    names.filter(Boolean).join(' ').replace(/\,/g, ' ');
}

export default classes;