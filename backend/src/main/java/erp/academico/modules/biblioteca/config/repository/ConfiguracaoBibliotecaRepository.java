package erp.academico.modules.biblioteca.config.repository;

import erp.academico.modules.biblioteca.config.model.ConfiguracaoBiblioteca;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ConfiguracaoBibliotecaRepository extends JpaRepository<ConfiguracaoBiblioteca, UUID> {
}

