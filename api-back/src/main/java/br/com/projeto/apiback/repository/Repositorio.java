package br.com.projeto.apiback.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.projeto.apiback.model.Cliente;

@Repository
public interface Repositorio extends CrudRepository<Cliente, Long>{
    
}
